import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import React from 'react';
import { Button, Input, Text, View, YStack } from 'tamagui';
import { Stack } from 'expo-router';

export default function SignIn() {
	const { signIn, setActive, isLoaded } = useSignIn();
	const router = useRouter();

	const [emailAddress, setEmailAddress] = React.useState('qbin221@gmail.com');
	const [password, setPassword] = React.useState('trogdor221');

	// Handle the submission of the sign-in form
	const onSignInPress = async (email: string, password: string) => {
		if (!isLoaded) return;

		// Start the sign-in process using the email and password provided
		try {
			const signInAttempt = await signIn.create({
				identifier: email,
				password: password,
			});

			// If sign-in process is complete, set the created session as active
			// and redirect the user
			if (signInAttempt.status === 'complete') {
				await setActive({ session: signInAttempt.createdSessionId });
				router.replace('/');
			} else {
				// If the status isn't complete, check why. User might need to
				// complete further steps.
				console.error(JSON.stringify(signInAttempt, null, 2));
			}
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			console.error(JSON.stringify(err, null, 2));
		}
	};

	return (
		<YStack justify='center' flex={1} gap={'$2'}>
			{/* <Input
				autoCapitalize='none'
				value={emailAddress}
				placeholder='Enter email'
				onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
			/>
			<Input
				value={password}
				placeholder='Enter password'
				secureTextEntry={true}
				onChangeText={(password) => setPassword(password)}
			/> */}
			<>
				<Button
					onPress={() =>
						onSignInPress('jade+clerk_test@gmail.com', 'trogdor221')
					}>
					<Text>Sign In Jade</Text>
				</Button>
				<Button
					onPress={() =>
						onSignInPress('britney+clerk_test@gmail.com', 'trogdor221')
					}>
					<Text>Sign In Britney</Text>
				</Button>
				<Button
					onPress={() =>
						onSignInPress('crystal+clerk_test@gmail.com', 'trogdor221')
					}>
					<Text>Sign In Crystal</Text>
				</Button>
				<Button
					onPress={() =>
						onSignInPress('jerardgonzalez@gmail.com', 'trogdor221')
					}>
					<Text>Sign In Rose</Text>
				</Button>
				<Button
					onPress={() => onSignInPress('qbin221@gmail.com', 'trogdor221')}>
					<Text>Sign In DJ</Text>
				</Button>
			</>
		</YStack>
	);
}
