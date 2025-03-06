import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import {
	Button,
	Form,
	H4,
	H5,
	H6,
	Input,
	Spinner,
	XStack,
	YStack,
} from 'tamagui';
import { useEffect, useState } from 'react';

export default function CreateUserScreen() {
	const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>(
		'off'
	);
	const [name, setName] = useState('');
	const [type, setType] = useState('');

	console.log('hi');

	useEffect(() => {
		if (status === 'submitting') {
			const timer = setTimeout(() => setStatus('off'), 2000);
			return () => {
				clearTimeout(timer);
			};
		}
	}, [status]);

	const handleSubmit = () => {
		setStatus('submitting');
		console.log(name, type);
	};

	return (
		<YStack flex={1}>
			<Form
				gap='$4'
				onSubmit={handleSubmit}
				borderWidth={1}
				bg='$background'
				rounded={4}
				borderColor='$borderColor'
				p={8}>
				<H6>Name</H6>
				<Input
					size='$4'
					borderWidth={2}
					onChangeText={(text) => setName(text)}
					value={name}
				/>
				<H6>Type</H6>
				<Input
					size='$4'
					borderWidth={2}
					onChangeText={(text) => setType(text)}
					value={type}
				/>
				<Form.Trigger asChild disabled={status !== 'off'}>
					<Button
						icon={status === 'submitting' ? () => <Spinner /> : undefined}>
						Submit
					</Button>
				</Form.Trigger>
			</Form>
		</YStack>
	);
}
