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
	const onSignInPress = async () => {
		if (!isLoaded) return;

		// Start the sign-in process using the email and password provided
		try {
			const signInAttempt = await signIn.create({
				identifier: emailAddress,
				password,
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
			<Input
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
			/>
			<Button onPress={onSignInPress}>
				<Text>Sign In</Text>
			</Button>
		</YStack>
	);
}
