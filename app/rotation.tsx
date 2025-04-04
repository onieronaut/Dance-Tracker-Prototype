import { QueueRotationItem } from '@/components/QueueRotationItem';
import { StageRotationItem } from '@/components/StageRotationItem';
import {
	getQueueRotation,
	getStageRotation,
	nextSong,
	updateRotation,
} from '@/db/rotation/database';
import { RotationType } from '@/types/rotation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TouchableOpacity } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Button, Text, XStack, YStack } from 'tamagui';

export default function RotationScreen() {
	const {
		data: queueRotation,
		// refetch: refetchDancers,
		isLoading,
		status,
	} = useQuery({
		queryKey: ['queueRotation'],
		queryFn: getQueueRotation,
	});

	const {
		data: stageRotation,
		// refetch: refetchDancers,
		// isLoading,
	} = useQuery({
		queryKey: ['stageRotation'],
		queryFn: getStageRotation,
	});

	console.log(stageRotation);

	const queryClient = useQueryClient();

	const nextSongMutation = useMutation({
		mutationFn: nextSong,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['queueRotation'] });
			queryClient.invalidateQueries({ queryKey: ['stageRotation'] });
		},
	});

	const updateRotationMutation = useMutation({
		mutationFn: (updatedRotation: RotationType[]) =>
			updateRotation(updatedRotation),
		onMutate: async (updatedRotation: RotationType[]) => {
			await queryClient.cancelQueries({ queryKey: ['queueRotation'] });

			const prevRotation = queryClient.getQueryData(['queueRotation']);

			queryClient.setQueryData(['queueRotation'], updatedRotation);

			return { prevRotation };
		},
		onError: (err, updatedRotation, context) => {
			queryClient.setQueryData(['queueRotation'], context.prevRotation);
		},
		onSettled: () => {
			queryClient.refetchQueries({ queryKey: ['queueRotation'] });
		},
	});

	const { isPending, submittedAt, variables, mutate, isError } =
		updateRotationMutation;

	const handleOnDragEnd = ({ data }: { data: RotationType[] }) => {
		if (JSON.stringify(data) === JSON.stringify(queueRotation)) return;

		if (data === queueRotation) console.log('hi');

		const updatedRotation = data.map((slot, index) => {
			return {
				...queueRotation[index],
				userId: slot.userId,
				userName: slot.userName,
				status: slot.status,
				timestamp: slot.timestamp,
			};
		});

		mutate(updatedRotation);
	};

	if (isLoading) return <Text>Loading...</Text>;

	return (
		<YStack flex={1}>
			<XStack>
				<Button onPress={() => nextSongMutation.mutate()}>Next Song</Button>
			</XStack>
			<YStack gap={'$2'}>
				{stageRotation
					.sort((a, b) => a.position - b.position)
					.map((slot) => (
						<StageRotationItem slot={slot} key={slot.rotationId} />
					))}
			</YStack>
			<YStack>
				<DraggableFlatList
					data={queueRotation}
					keyExtractor={(item) => item.rotationId}
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
				/>
			</YStack>
		</YStack>
	);
}
