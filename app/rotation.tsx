import { StageRotationItem } from '@/components/StageRotationItem';
import { DocumentType } from '@/graphql/generated';
import {
	ChangeRotationDocument,
	RotationDocument,
} from '@/graphql/generated/graphql';
import { useMutation, useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { memo, useEffect, useState } from 'react';
import { InteractionManager, Pressable } from 'react-native';
import ReorderableList, {
	ReorderableListReorderEvent,
	reorderItems,
	useReorderableDrag,
} from 'react-native-reorderable-list';
import { Text, XStack, YStack } from 'tamagui';

export default function RotationScreen() {
	const { loading, error, data } = useQuery(RotationDocument);
	const [dragData, setDragData] = useState<
		DocumentType<typeof RotationDocument>['rotation']
	>([]);

	useEffect(() => {
		if (data?.rotation) {
			setDragData([...data.rotation]);
		}
	}, [data?.rotation]);

	const stageRotation = data?.rotation.filter((slot) => slot.type === 'stage');
	const queueRotation = data?.rotation.filter((slot) => slot.type === 'queue');

	const [changeRotation] = useMutation(
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
		const initialList = [...dragData];
		const updatedList = reorderItems(dragData, from, to);

		setDragData(updatedList);

		InteractionManager.runAfterInteractions(() => {
			const timestamp = dayjs().toISOString();

			const updateRotationMany = updatedList.map((slot, index) => {
				return {
					where: { id: { _eq: initialList[index].id } },
					_set: { userId: slot.currentUserRotation.user.id },
				};
			});

			const insertUserRotation = updatedList.map((slot, index) => {
				return {
					rotationId: initialList[index].id,
					userId: slot.currentUserRotation.user.id,
				};
			});

			const updateUserRotation = updatedList.map(
				(slot) => slot.currentUserRotation?.id
			);

			const optimisticResponse = updatedList.map((slot, index) => {
				const rotationName = initialList[index].name;
				const user = slot.currentUserRotation?.user;

				// const activeSession = slot.currentUserRotation.user.activeSession
				// 	? {
				// 			id: user.activeSession?.id,
				// 			startTime: user.activeSession?.startTime,
				// 			endTime: null,
				// 	  }
				// 	: null;

				return {
					id: slot.id,
					index: slot.index,
					type: slot.type,
					name: rotationName,
					currentUserRotation: {
						id: 'temp-' + slot.id,
						user: user,
						// user: {
						// 	id: user.id,
						// 	name: user.name,
						// 	status: user.status,
						// 	activeSession: activeSession,
						// },
					},
				};
			});

			changeRotation({
				variables: {
					endTime: timestamp,
					updateRotationMany: updateRotationMany,
					updateUserRotation: updateUserRotation,
					insertUserRotation: insertUserRotation,
				},
				optimisticResponse: {
					__typename: 'mutation_root',
					insertUserRotation: {
						__typename: 'UserRotationMutationResponse',
						affectedRows: insertUserRotation.length,
					},
					updateUserRotation: {
						__typename: 'UserRotationMutationResponse',
						affectedRows: updateUserRotation.length,
					},
					updateRotationMany: [
						{
							__typename: 'RotationMutationResponse',
							returning: optimisticResponse,
						},
					],
				},
			});
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
					keyExtractor={(item) => item.id}
				/>
			</YStack>
		</YStack>
	);
}
