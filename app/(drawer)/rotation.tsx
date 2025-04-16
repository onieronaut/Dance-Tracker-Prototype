import { QueueRotationItem } from '@/components/QueueRotationItem';
import { StageRotationItem } from '@/components/StageRotationItem';
import { DocumentType } from '@/graphql/generated';
import {
	QueueRotationDocument,
	RotateDocument,
	StageRotationDocument,
	UpdateQueueRotationDocument,
} from '@/graphql/generated/graphql';
import { useMutation, useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { InteractionManager } from 'react-native';
import ReorderableList, {
	ReorderableListReorderEvent,
	reorderItems,
} from 'react-native-reorderable-list';
import { Button, Text, XStack, YStack } from 'tamagui';

export default function RotationScreen() {
	const queueRotation = useQuery(QueueRotationDocument);
	const stageRotation = useQuery(StageRotationDocument);
	const [dragData, setDragData] = useState<
		DocumentType<typeof QueueRotationDocument>['activeRotation']
	>([]);

	console.log('[queue]', queueRotation.data);

	useEffect(() => {
		if (queueRotation?.data?.activeRotation) {
			setDragData([...queueRotation.data.activeRotation]);
		}
	}, [queueRotation?.data?.activeRotation]);

	const [rotate] = useMutation(RotateDocument, {
		update: (cache, { data: { updateRotationMany } }) => {
			const queueData = {
				...cache.readQuery({ query: QueueRotationDocument }),
			};
			const stageData = {
				...cache.readQuery({ query: StageRotationDocument }),
			};

			queueData.activeRotation = [
				...updateRotationMany[0].returning.filter(
					(slot) => slot.type === 'queue'
				),
			];
			stageData.rotation = [
				...updateRotationMany[0].returning.filter(
					(slot) => slot.type === 'stage'
				),
			];

			cache.writeQuery({ query: QueueRotationDocument, data: queueData });
			cache.writeQuery({ query: StageRotationDocument, data: stageData });
		},
		refetchQueries: [QueueRotationDocument, StageRotationDocument],
	});

	const [updateQueueRotation] = useMutation(UpdateQueueRotationDocument, {
		update: (cache, { data: { updateRotationMany } }) => {
			const data = { ...cache.readQuery({ query: QueueRotationDocument }) };

			let rotation = [...updateRotationMany[0].returning];
			data.rotation = rotation;

			cache.writeQuery({ query: QueueRotationDocument, data });
		},
		refetchQueries: [QueueRotationDocument],
	});

	const handleRotate = () => {
		const initialList = [
			...stageRotation.data.rotation,
			...queueRotation.data.rotation,
		];

		const timestamp = dayjs().toISOString();

		const updateRotationMany = initialList
			.map((slot, index) => {
				if (index === initialList.length - 1) {
					if (!initialList[0]?.currentUserRotation?.user?.id) return;

					return {
						where: { id: { _eq: slot.id } },
						_set: {
							userId: initialList[0]?.currentUserRotation?.user?.id,
						},
					};
				}

				if (!initialList[index + 1]?.currentUserRotation?.user?.id) return;

				return {
					where: { id: { _eq: slot.id } },
					_set: {
						userId: initialList[index + 1]?.currentUserRotation?.user?.id,
					},
				};
			})
			.filter((slot) => slot);

		const updateUserRotation = initialList
			.map((slot) => slot.currentUserRotation?.id)
			.filter((slot) => slot);

		const insertUserRotation = initialList
			.map((slot, index) => {
				if (index === initialList.length - 1) {
					if (!initialList[0]?.currentUserRotation?.user?.id) return;

					return {
						rotationId: slot.id,
						userId: initialList[0]?.currentUserRotation?.user?.id,
					};
				}

				if (!initialList[index + 1]?.currentUserRotation?.user?.id) return;

				return {
					rotationId: slot.id,
					userId: initialList[index + 1]?.currentUserRotation?.user?.id,
				};
			})
			.filter((slot) => slot);

		const optimisticResponse = initialList
			.map((slot, index) => {
				if (index === initialList.length - 1) {
					if (!initialList[0]?.currentUserRotation?.user?.id) return;

					const user = {
						...initialList[0]?.currentUserRotation?.user,
						name: initialList[0]?.currentUserRotation?.user?.name,
					};

					return {
						id: slot.id,
						name: slot.name,
						index: slot.index,
						type: slot.type,
						currentUserRotation: {
							id: 'temp-' + slot.id,
							user: user,
						},
					};
				}

				if (!initialList[index + 1]?.currentUserRotation?.user?.id) return slot;

				const user = {
					...initialList[index + 1]?.currentUserRotation?.user,
					name: initialList[index + 1]?.currentUserRotation?.user?.name,
				};

				return {
					id: slot.id,
					name: slot.name,
					index: slot.index,
					type: slot.type,
					currentUserRotation: {
						id: 'temp-' + slot.id,
						user: user,
					},
				};
			})
			.filter((slot) => slot);

		// console.log('[initial]', initialList);
		// console.log('[update]', updateRotationMany);
		// console.log('[userRotation]', updateUserRotation);
		// console.log('[insert]', insertUserRotation);
		// console.log('[optimisticResponse]', optimisticResponse);

		rotate({
			variables: {
				updates: updateRotationMany,
				endTime: timestamp,
				_in: updateUserRotation,
				objects: insertUserRotation,
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
	};

	const handleReorder = ({ from, to }: ReorderableListReorderEvent) => {
		const initialList = [...dragData];
		const updatedList = reorderItems(dragData, from, to);

		console.log(updatedList);

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

				return {
					id: slot.id,
					name: rotationName,
					index: slot.index,
					type: slot.type,
					currentUserRotation: {
						id: 'temp-' + slot.id,
						user: user,
					},
				};
			});

			updateQueueRotation({
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

	if (queueRotation.loading || stageRotation.loading)
		return <Text>Loading...</Text>;

	return (
		<YStack flex={1} gap={'$2'}>
			<YStack gap={'$2'}>
				{stageRotation?.data?.rotation.map((slot) => (
					<StageRotationItem slot={slot} key={slot.id} />
				))}
			</YStack>
			<YStack>
				<ReorderableList
					data={dragData}
					onReorder={handleReorder}
					renderItem={({ item }) => (
						<YStack my={'$1'}>
							<QueueRotationItem slot={item} />
						</YStack>
					)}
					keyExtractor={(item) => item.id}
				/>
			</YStack>
			<XStack flex={1}>
				<Button onPress={handleRotate}>Next Song</Button>
			</XStack>
		</YStack>
	);
}
