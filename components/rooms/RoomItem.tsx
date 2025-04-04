import { DoorClosed, DoorOpen, Hourglass } from '@tamagui/lucide-icons';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import React, { useEffect, useState } from 'react';
import { Button, Card, H6, Text, XStack, YStack } from 'tamagui';
import { RoomStatusChip } from '../ui/RoomStatusChip';
import { FragmentType, getFragmentData, gql } from '@/graphql';
import { useMutation } from '@apollo/client';
import { RoomsQueryDocument } from '@/app/rooms';

dayjs.extend(duration);

export const RoomFragment = gql(/* GraphQL */ `
	fragment Room on Rooms {
		id
		name
		status
		activeSession {
			id
			startTime
			endTime
			activeUsers {
				id
				user {
					name
				}
			}
		}
	}
`);

const EndSessionMutation = gql(/* GraphQL */ `
	mutation EndSession(
		$roomId: uuid = ""
		$roomStatus: String = ""
		$sessionId: uuid = ""
		$sessionStatus: String = ""
		$endTime: timestamptz = ""
		$userSessionIds: [uuid!] = ""
		$userSessionStatus: String = ""
	) {
		updateRoomsByPk(pkColumns: { id: $roomId }, _set: { status: $roomStatus }) {
			id
		}
		updateSessionsByPk(
			pkColumns: { id: $sessionId }
			_set: { status: $sessionStatus, endTime: $endTime }
		) {
			id
		}
		updateUserSessionsMany(
			updates: {
				where: { id: { _in: $userSessionIds } }
				_set: { status: $userSessionStatus, endTime: $endTime }
			}
		) {
			returning {
				id
			}
		}
	}
`);

export const RoomItem = (props: {
	room: FragmentType<typeof RoomFragment>;
	// handleOpenAddDancersToRoom,
}) => {
	const initialTime = '0:00';
	const [time, setTime] = useState(initialTime);
	const room = getFragmentData(RoomFragment, props.room);

	const [endSession, { data, loading, error }] = useMutation(
		EndSessionMutation,
		{ refetchQueries: [RoomsQueryDocument] }
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

		await endSession({
			variables: {
				roomId: room.id,
				roomStatus: 'Open',
				sessionId: room.activeSession.id,
				sessionStatus: 'Complete',
				endTime: timestamp,
				userSessionIds: userSessionIds,
				userSessionStatus: 'Complete',
			},
		});
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
						// onPress={() => handleOpenAddDancersToRoom(room.id)}
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
