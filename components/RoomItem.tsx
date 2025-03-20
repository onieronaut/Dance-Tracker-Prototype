import { RoomType } from '@/types/rooms';
import React, { useState } from 'react';
import { Card, XStack, H2, Button } from 'tamagui';
import { StatusChip } from './ui/StatusChip';
import { Link } from 'expo-router';
import { AddDancersToRoom } from './AddDancersToRoom';

interface RoomItemPropsType {
	room: RoomType;
	handleOpenAddDancersToRoom: any;
}

export const RoomItem = ({
	room,
	handleOpenAddDancersToRoom,
}: RoomItemPropsType) => {
	return (
		<>
			<Card>
				<Card.Header>
					<XStack justify='space-between'>
						<H2>{room.name}</H2>
						<StatusChip status={room.status} />
					</XStack>
				</Card.Header>
				<Card.Footer />
				<Button onPress={() => handleOpenAddDancersToRoom(room.roomId)}>
					Add Dancers
				</Button>
				<Card.Background />
			</Card>
		</>
	);
};
