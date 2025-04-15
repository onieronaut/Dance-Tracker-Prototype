import { QueueRotationItem } from '@/components/QueueRotationItem';
import { StageRotationItem } from '@/components/StageRotationItem';
import { DocumentType } from '@/graphql/generated';
import {
	QueueRotationDocument,
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
import { Text, XStack, YStack } from 'tamagui';

export default function RotationScreen() {
	const queueRotation = useQuery(QueueRotationDocument);
	const stageRotation = useQuery(StageRotationDocument);
	const [dragData, setDragData] = useState<
		DocumentType<typeof QueueRotationDocument>['rotation']
	>([]);

	useEffect(() => {
		if (queueRotation?.data?.rotation) {
			setDragData([...queueRotation.data.rotation]);
		}
	}, [queueRotation?.data?.rotation]);

	const [changeRotation] = useMutation(
		UpdateQueueRotationDocument,

		{
			update: (cache, { data: { updateRotationMany } }) => {
				const data = { ...cache.readQuery({ query: QueueRotationDocument }) };

				let rotation = [...updateRotationMany[0].returning];
				data.rotation = rotation;

				cache.writeQuery({ query: QueueRotationDocument, data });
			},
			refetchQueries: [QueueRotationDocument],
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

	stageRotation.data;

	if (queueRotation.loading || stageRotation.loading)
		return <Text>Loading...</Text>;

	return (
		<YStack flex={1}>
			<XStack>
				{/* <Button onPress={() => nextSongMutation.mutate()}>Next Song</Button> */}
			</XStack>
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
						<YStack gap={'$2'}>
							<QueueRotationItem slot={item} />
						</YStack>
					)}
					keyExtractor={(item) => item.id}
				/>
			</YStack>
		</YStack>
	);
}
