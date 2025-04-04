import { FragmentType, getFragmentData, gql } from '@/graphql';
import React from 'react';
import { XStack } from 'tamagui';
import { RoomItem } from './RoomItem';

export const RoomsListFragment = gql(/* GraphQL */ `
	fragment RoomsList on Rooms {
		id
		...Room
	}
`);

export const RoomsList = (props: {
	rooms: FragmentType<typeof RoomsListFragment>[];
}) => {
	const rooms = getFragmentData(RoomsListFragment, props.rooms);

	console.log('[rooms list]:', rooms);

	return (
		<>
			{rooms?.map((room) => (
				<XStack width={'32%'} key={room.id}>
					<RoomItem
						room={room}
						// handleOpenAddDancersToRoom={handleOpenAddDancersToRoom}
					/>
				</XStack>
			))}
		</>
	);
};
