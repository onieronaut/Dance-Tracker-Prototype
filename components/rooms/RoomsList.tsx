import { FragmentType, getFragmentData } from '@/graphql/generated';
import { RoomsListFragmentDoc } from '@/graphql/generated/graphql';
import React from 'react';
import { XStack } from 'tamagui';
import { RoomItem } from './RoomItem';

export const RoomsList = (props: {
	rooms: FragmentType<typeof RoomsListFragmentDoc>[];
	handleOpen: (roomId: string) => void;
}) => {
	const rooms = getFragmentData(RoomsListFragmentDoc, props.rooms);

	console.log('[rooms list]:', rooms);

	return (
		<>
			{rooms?.map((room) => (
				<XStack width={'32%'} key={room.id}>
					<RoomItem room={room} handleOpen={props.handleOpen} />
				</XStack>
			))}
		</>
	);
};
