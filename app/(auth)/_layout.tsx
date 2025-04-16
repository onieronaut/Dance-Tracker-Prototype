import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function AuthLayout() {
	const { isSignedIn } = useAuth();

	if (isSignedIn) {
		return <Redirect href={'/'} />;
	}

	return (
		<Stack
			screenOptions={{
				headerShown: false, // default to hidden
			}}>
			<Stack.Screen
				name='sign-in'
				options={{
					headerShown: true, // override default
					title: 'Sign In', // custom title
				}}
			/>
		</Stack>
	);
}
