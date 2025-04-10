import { QueueRotationItem } from '@/components/QueueRotationItem';
import { StageRotationItem } from '@/components/StageRotationItem';
import { FragmentType, getFragmentData } from '@/graphql/generated';
import {
	ChangeRotationDocument,
	Rotation,
	RotationDocument,
	SlotFragmentDoc,
} from '@/graphql/generated/graphql';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import dayjs from 'dayjs';
import { memo, useEffect, useState } from 'react';
import { InteractionManager, Pressable, TouchableOpacity } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Button, Text, XStack, YStack } from 'tamagui';
import ReorderableList, {
	ReorderableListIndexChangeEvent,
	ReorderableListReorderEvent,
	reorderItems,
	useReorderableDrag,
} from 'react-native-reorderable-list';

export default function RotationScreen() {
	const { loading, error, data } = useQuery(RotationDocument);
	const [dragData, setDragData] = useState([]);

	useEffect(() => {
		if (data?.rotation) {
			setDragData([...data.rotation]);

			console.log('[res]', data.rotation);
		}
	}, [data?.rotation]);

	const stageRotation = data?.rotation.filter((slot) => slot.type === 'stage');
	const queueRotation = data?.rotation.filter((slot) => slot.type === 'queue');

	const [changeRotation, { error: mutationError }] = useMutation(
		ChangeRotationDocument,

		{
			update: (cache, { data: { updateRotationMany } }) => {
				const data = { ...cache.readQuery({ query: RotationDocument }) };

				let rotation = [...updateRotationMany[0].returning];
				data.rotation = rotation;

				cache.writeQuery({ query: RotationDocument, data });
			},
			refetchQueries: [RotationDocument],
			// onCompleted: (result) => {
			// 	const rotation = result.updateRotationMany.map(
			// 		(slot) => slot.returning[0]
			// 	);
			// 	console.log('[res]', rotation);

			// 	setDragData([...rotation]);
			// },
		}
	);

	const handleReorder = ({ from, to }: ReorderableListReorderEvent) => {
		const y: FragmentType<typeof SlotFragmentDoc>[] = [...dragData];
		const x: FragmentType<typeof SlotFragmentDoc>[] = reorderItems(
			dragData,
			from,
			to
		);
		const prevOrder = getFragmentData(SlotFragmentDoc, y);

		const newOrder = getFragmentData(SlotFragmentDoc, x);

		setDragData((value) => {
			console.log('[prev]', value);

			const x = reorderItems(value, from, to);
			console.log('[new]', x);

			return x;
		});

		InteractionManager.runAfterInteractions(() => {
			console.log('[copy]', newOrder);

			const updateRotations = newOrder.map((slot, index) => {
				return {
					where: { id: { _eq: prevOrder[index].id } },
					_set: { userId: slot.currentUserRotation.user.id },
				};
			});

			const optimisticResponse = newOrder.map((slot, index) => {
				const rotationId = slot.id;
				const rotationName = prevOrder[index].name;
				const user = slot.currentUserRotation?.user;

				const activeSession = slot.currentUserRotation.user.activeSession
					? {
							// __typename: 'ActiveUsers',
							id: user.activeSession?.id,
							startTime: user.activeSession?.startTime,
							endTime: null,
							room: {
								// __typename: 'Rooms',
								id: user.activeSession?.room?.id,
								name: user.activeSession?.room?.name,
							},
					  }
					: null;

				return {
					// __typename: 'Rotation',
					id: rotationId,
					index: slot.index,
					type: slot.type,
					name: rotationName,
					currentUserRotation: {
						// __typename: 'CurrentUserRotation',
						id: 'temp-' + rotationId,
						user: {
							// __typename: 'Users',
							id: user.id,
							name: user.name,
							status: user.status,
							activeSession: activeSession,
						},
					},
				};
			});

			console.log('[update]', updateRotations);
			console.log('[op]', optimisticResponse);

			const insertUserSessions = newOrder.map((slot, index) => {
				return {
					rotationId: prevOrder[index].id,
					userId: slot.currentUserRotation.user.id,
				};
			});

			const userRotationIds = newOrder.map(
				(slot) => slot.currentUserRotation?.id
			);

			const timestamp = dayjs().toISOString();
			console.log(timestamp);
			console.log(userRotationIds);

			console.log('[insert]', insertUserSessions);

			changeRotation({
				variables: {
					updates: updateRotations,
					endTime: timestamp,
					userRotationIds: userRotationIds,
					objects: insertUserSessions,
				},
				optimisticResponse: {
					__typename: 'mutation_root',
					insertUserRotation: {
						__typename: 'UserRotationMutationResponse',
						affectedRows: insertUserSessions.length,
					},
					updateUserRotation: {
						__typename: 'UserRotationMutationResponse',
						affectedRows: userRotationIds.length,
					},
					updateRotationMany: [
						{
							__typename: 'RotationMutationResponse',
							affectedRows: newOrder.length,
							returning: optimisticResponse,
						},
					],
				},
			});
		});
	};

	const handleOnDragEnd = ({
		data: dragData,
	}: {
		data: FragmentType<typeof SlotFragmentDoc>[];
	}) => {
		const rotation = getFragmentData(SlotFragmentDoc, dragData);

		const updateRotations = rotation.map((slot, index) => {
			return {
				where: { id: { _eq: data.rotation[index].id } },
				_set: { userId: slot.currentUserRotation?.user?.id },
			};
		});

		const optimisticUpdateRotations = rotation.map((slot, index) => {
			const rotationId = data.rotation[index].id;
			const rotationName = data.rotation[index].name;
			const user = slot.currentUserRotation?.user;

			console.log('[user]', user);

			const activeSession = slot.currentUserRotation.user.activeSession
				? {
						id: user.activeSession?.id,
						startTime: user.activeSession?.startTime,
						endTime: null,
						room: {
							id: user.activeSession?.room?.id,
							name: user.activeSession?.room?.name,
						},
				  }
				: null;

			return {
				id: rotationId,
				index: slot.index,
				type: slot.type,
				name: rotationName,
				currentUserRotation: {
					id: 'temp-' + rotationId,
					user: {
						id: user.id,
						name: user.name,
						status: user.status,
						activeSession: activeSession,
					},
				},
			};
		});

		setDragData([...optimisticUpdateRotations]);

		const insertUserSessions = rotation.map((slot, index) => {
			return {
				rotationId: data.rotation[index].id,
				userId: slot.currentUserRotation?.user?.id,
			};
		});

		const userRotationIds = rotation.map(
			(slot) => slot.currentUserRotation?.id
		);

		const timestamp = dayjs().toISOString();

		changeRotation({
			variables: {
				updates: updateRotations,
				endTime: timestamp,
				userRotationIds: userRotationIds,
				objects: insertUserSessions,
			},
			optimisticResponse: {
				__typename: 'mutation_root',
				insertUserRotation: {
					__typename: 'UserRotationMutationResponse',
					affectedRows: insertUserSessions.length,
				},
				updateUserRotation: {
					__typename: 'UserRotationMutationResponse',
					affectedRows: userRotationIds.length,
				},
				updateRotationMany: [
					{
						__typename: 'RotationMutationResponse',
						affectedRows: rotation.length,
						returning: optimisticUpdateRotations,
					},
				],
			},
		});
	};

	const Card: React.FC<any> = memo((props) => {
		const drag = useReorderableDrag();

		return (
			<Pressable
				onLongPress={drag}
				style={{ backgroundColor: 'red', padding: 24 }}>
				<Text>{props.name}</Text>
				<Text>{props.currentUserRotation.user.name}</Text>
			</Pressable>
		);
	});

	const renderItem = ({ item }: any) => <Card {...item} />;

	if (loading) return <Text>Loading...</Text>;

	return (
		<YStack flex={1}>
			<XStack>
				{/* <Button onPress={() => nextSongMutation.mutate()}>Next Song</Button> */}
			</XStack>
			<YStack gap={'$2'}>
				{stageRotation.map((slot) => (
					<StageRotationItem slot={slot} key={slot.id} />
				))}
			</YStack>
			<YStack>
				<ReorderableList
					data={dragData}
					onReorder={handleReorder}
					renderItem={renderItem}
					// IMPORTANT: Do not use the current index as key.
					// Always use a stable and unique key for each item.
					keyExtractor={(item) => item.id}
				/>
				{/* <DraggableFlatList
					data={dragData}
					keyExtractor={(item) => item.id}
					onDragEnd={handleOnDragEnd}
					scrollEnabled
					activationDistance={10}
					renderItem={({ item, drag, isActive }) => (
						<YStack my={'$2'}>
							<TouchableOpacity onLongPress={drag} disabled={isActive}>
								<QueueRotationItem slot={item} />
							</TouchableOpacity>
						</YStack>
					)}
				/> */}
			</YStack>
		</YStack>
	);
}
