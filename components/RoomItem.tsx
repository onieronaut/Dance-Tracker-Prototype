import { RoomType } from '@/types/rooms';
import React, { useEffect, useState } from 'react';
import { Card, XStack, H2, Button, H3, Text } from 'tamagui';
import { StatusChip } from './ui/StatusChip';
import { Link } from 'expo-router';
import { AddDancersToRoom } from './AddDancersToRoom';
import dayjs from 'dayjs';
import { endSession } from '@/db/sessions/database';

interface RoomItemPropsType {
	room: RoomType;
	handleOpenAddDancersToRoom: any;
}

export const RoomItem = ({
	room,
	handleOpenAddDancersToRoom,
}: RoomItemPropsType) => {
	const [time, setTime] = useState('0:00');

	useEffect(() => {
		if (room.timestamp === 0) return;

		const intervalId = setInterval(() => {
			setTime(dayjs(new Date().getTime() - room.timestamp).format('m:ss'));
		}, 1000);

		return () => clearInterval(intervalId);
	}, [room.timestamp]);

	const handleEndSession = async () => {
		try {
			await endSession(room.sessionId);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Card flex={1}>
				<Card.Header>
					<XStack justify='space-between'>
						<H3>{room.name}</H3>
						<StatusChip status={room.status} />
					</XStack>
				</Card.Header>
				<Card.Footer>
					<Text>{time} </Text>
				</Card.Footer>
				{room.status === 'Open' && (
					<Button onPress={() => handleOpenAddDancersToRoom(room.roomId)}>
						Add Dancers
					</Button>
				)}
				{room.status === 'In Use' && (
					<Button onPress={handleEndSession}>Finish</Button>
				)}
			</Card>
		</>
	);
};
