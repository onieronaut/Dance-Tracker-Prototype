import {
	ClockInDocument,
	ClockOutDocument,
	GetUserDocument,
} from '@/graphql/generated/graphql';
import { useMutation, useQuery } from '@apollo/client';
import { useUser } from '@clerk/clerk-expo';
import { Button, H1, Text, XStack, YStack } from 'tamagui';

export default function DashboardScreen() {
	const { user } = useUser();
	const userId = user?.publicMetadata?.hasura_user_id as string;

	const { data, loading } = useQuery(GetUserDocument, {
		variables: { id: userId },
	});

	console.log('[data]', data);

	const [clockIn] = useMutation(ClockInDocument, {
		refetchQueries: [GetUserDocument],
	});

	const [clockOut] = useMutation(ClockOutDocument, {
		refetchQueries: [GetUserDocument],
	});

	if (loading) return <Text>Loading...</Text>;

	return (
		<YStack flex={1}>
			<XStack justify='center'>
				<H1>Welcome {data?.usersByPk?.name}</H1>
			</XStack>
			<YStack>
				<Text>Login Status {data?.usersByPk?.loginStatus}</Text>
				<Text>Shift Status {data?.usersByPk?.shiftStatus}</Text>
				<Text>Floor Status {data?.usersByPk?.status}</Text>
			</YStack>
			{data?.usersByPk?.shiftStatus === 'Clocked Out' && (
				<Button onPress={() => clockIn()}>Clock In</Button>
			)}
			{data?.usersByPk?.shiftStatus === 'Clocked In' && (
				<Button onPress={() => clockOut()}>Clock Out</Button>
			)}
		</YStack>
	);
}
