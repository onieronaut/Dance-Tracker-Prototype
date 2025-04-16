import { GetUserDocument } from '@/graphql/generated/graphql';
import { useQuery } from '@apollo/client';
import { useAuth, useSession, useUser } from '@clerk/clerk-expo';
import { Text } from 'tamagui';

export default function ProfileScreen() {
	const { user } = useUser();

	const { data, loading } = useQuery(GetUserDocument, {
		variables: { id: user?.publicMetadata?.hasura_user_id as string },
	});

	if (loading) return <Text>Loading...</Text>;

	return (
		<>
			<Text>{data.usersByPk.name}</Text>
			<Text>{user?.emailAddresses[0].emailAddress}</Text>
		</>
	);
}
