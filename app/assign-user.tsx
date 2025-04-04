import { assignUser } from '@/db/rotation/database';
import { getDancers } from '@/db/users/database';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, YStack } from 'tamagui';

export default function AssignUserScreen() {
	const queryClient = useQueryClient();

	const {
		data: dancers,
		refetch: refetchDancers,
		isLoading,
	} = useQuery({
		queryKey: ['dancers'],
		queryFn: getDancers,
	});

	const mutation = useMutation({
		mutationFn: (userId: string) => assignUser(userId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['rotation'] });
		},
	});

	const handleMutation = async () => {
		mutation.mutate(dancers[2].userId);
	};

	return (
		<YStack flex={1}>
			<Button onPress={handleMutation}>Assign</Button>
		</YStack>
	);
}
