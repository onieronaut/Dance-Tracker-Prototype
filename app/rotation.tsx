import { QueueRotationItem } from '@/components/QueueRotationItem';
import { StageRotationItem } from '@/components/StageRotationItem';
import { DocumentType } from '@/graphql/generated';
import {
	ChangeRotationDocument,
	RotationDocument,
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
					renderItem={({ item }) => <QueueRotationItem slot={item} />}
					keyExtractor={(item) => item.id}
				/>
			</YStack>
		</YStack>
	);
}
