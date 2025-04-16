import { useAuth, useSession, useUser } from '@clerk/clerk-expo';
import { Text } from 'tamagui';

export default function ProfileScreen() {
	const { user } = useUser();
	const auth = useAuth();
	console.log(auth);

	console.log(user.publicMetadata);

	return <Text>{user?.emailAddresses[0].emailAddress}</Text>;
}
