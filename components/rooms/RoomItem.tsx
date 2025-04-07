import { FragmentType, getFragmentData } from '@/graphql/generated';
import {
	ActiveDancersDocument,
	EndSessionDocument,
	RoomFragmentDoc,
	RoomsDocument,
} from '@/graphql/generated/graphql';
import { useMutation } from '@apollo/client';
import { DoorClosed, DoorOpen, Hourglass } from '@tamagui/lucide-icons';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import React, { useEffect, useState } from 'react';
import { Button, Card, H6, Text, XStack, YStack } from 'tamagui';
import { RoomStatusChip } from '../ui/RoomStatusChip';

dayjs.extend(duration);

export const RoomItem = (props: {
	room: FragmentType<typeof RoomFragmentDoc>;
	handleOpen: (roomId: string) => void;
}) => {
	const initialTime = '0:00';
	const [time, setTime] = useState(initialTime);
	const room = getFragmentData(RoomFragmentDoc, props.room);

	const [endSession, { data, loading, error }] = useMutation(
		EndSessionDocument,
		{ refetchQueries: [RoomsDocument, ActiveDancersDocument] }
	);

	useEffect(() => {
		if (room.activeSession?.endTime !== null) return;

		const intervalId = setInterval(() => {
			const now = dayjs();
			const diff = now.diff(room.activeSession?.startTime);
			const time = dayjs.duration(diff).format('mm:ss');

			setTime(time);
		}, 1000);

		return () => clearInterval(intervalId);
	}, [room.activeSession]);

	const handleEndSession = async () => {
		const timestamp = dayjs().toISOString();
		const userSessionIds = room.activeSession.activeUsers.map(
			(userSession) => userSession.id
		);
		const userIds = room.activeSession.activeUsers.map((user) => user.user.id);

		setTime(initialTime);

		await endSession({
			variables: {
				roomId: room.id,
				sessionId: room.activeSession.id,
				endTime: timestamp,
				userSessionIds: userSessionIds,
				userIds: userIds,
			},
		});
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
						{room?.activeSession && (
							<XStack style={{ alignItems: 'center' }} gap={'$2'}>
								<Hourglass size={16} />
								<Text>{time}</Text>
							</XStack>
						)}
						<XStack>
							<YStack>
								{room.activeSession?.activeUsers.map((user) => (
									<Text key={user.id}>{user.user.name} </Text>
								))}
							</YStack>
						</XStack>
					</YStack>
				</Card.Header>
				{room.status === 'Open' && (
					<Button
						onPress={() => props.handleOpen(room.id)}
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
