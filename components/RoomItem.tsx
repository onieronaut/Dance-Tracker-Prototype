import { endSession } from '@/db/sessions/database';
import { RoomType } from '@/types/rooms';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Button, Card, H6, Text, XStack, YStack } from 'tamagui';
import { RoomStatusChip } from './ui/RoomStatusChip';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DoorClosed, DoorOpen, Hourglass } from '@tamagui/lucide-icons';

interface RoomItemPropsType {
	room: RoomType;
	handleOpenAddDancersToRoom: any;
}

export const RoomItem = ({
	room,
	handleOpenAddDancersToRoom,
}: RoomItemPropsType) => {
	const initialTime = '0:00';
	const [time, setTime] = useState(initialTime);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (sessionId: string) => endSession(sessionId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['rooms'] });
		},
	});

	useEffect(() => {
		if (room.timestamp === 0) return;

		const intervalId = setInterval(() => {
			setTime(dayjs(new Date().getTime() - room.timestamp).format('m:ss'));
		}, 1000);

		return () => clearInterval(intervalId);
	}, [room.timestamp]);

	const handleEndSession = async () => {
		mutation.mutate(room.sessionId);
		console.log(mutation);

		setTime(initialTime);
	};

	return (
		<>
			<Card flex={1}>
				<Card.Header>
					<YStack gap={'$2'}>
						<XStack justify='space-between' style={{ alignItems: 'center' }}>
							<H6>{room.name}</H6>
							<RoomStatusChip status={room.status} />
						</XStack>
						{room.timestamp > 0 && (
							<XStack style={{ alignItems: 'center' }} gap={'$2'}>
								<Hourglass size={16} />
								<Text>{time}</Text>
							</XStack>
						)}
						<XStack>
							<YStack>
								{room.users.map((user) => (
									<Text>{user} </Text>
								))}
							</YStack>
						</XStack>
					</YStack>
				</Card.Header>
				{room.status === 'Open' && (
					<Button
						onPress={() => handleOpenAddDancersToRoom(room.roomId)}
						icon={<DoorOpen size={18} />}>
						Start Session
					</Button>
				)}
				{room.status === 'In Use' && (
					<Button onPress={handleEndSession} icon={<DoorClosed size={18} />}>
						End Session
					</Button>
				)}
			</Card>
		</>
	);
};
