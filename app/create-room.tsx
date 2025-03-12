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
import { createUser } from '@/db/users/database';
import { createRoom } from '@/db/rooms/database';

export default function CreateRoomScreen() {
	const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>(
		'off'
	);
	const [name, setName] = useState('');

	const handleSubmit = async () => {
		const data = {
			name: name,
		};

		try {
			setStatus('submitting');
			await createRoom(data);
		} catch (err) {
			console.log(err);
		} finally {
			setStatus('off');
		}
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
