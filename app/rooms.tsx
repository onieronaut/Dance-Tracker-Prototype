import { AddDancersToRoom } from '@/components/AddDancersToRoom';
import { RoomItem } from '@/components/RoomItem';
import { getRooms } from '@/db/rooms/database';
import { getDancers } from '@/db/users/database';
import { RoomType } from '@/types/rooms';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Text, YStack } from 'tamagui';

export default function RoomsScreen() {
	const [open, setOpen] = useState(false);
	const [selectedRoom, setSelectedRoom] = useState<RoomType>();
	const queryClient = useQueryClient();

	const { data: rooms } = useQuery({ queryKey: ['rooms'], queryFn: getRooms });
	const { data: dancers } = useQuery({
		queryKey: ['dancers'],
		queryFn: getDancers,
	});

	const mutation = useMutation({
		// mutationFn:
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ['rooms'] });
		},
	});

	const handleOpenAddDancersToRoom = (roomId: string) => {
		const room = rooms.find((room) => room.roomId === roomId);

		setSelectedRoom(room);
		setOpen(true);
	};

	return (
		<YStack flex={1}>
			<AddDancersToRoom
				open={open}
				setOpen={setOpen}
				dancers={dancers}
				selectedRoom={selectedRoom}
			/>
			<FlatList
				data={rooms}
				keyExtractor={(item) => item.roomId}
				renderItem={({ item }) => (
					<YStack m={'$2'}>
						<RoomItem
							room={item}
							handleOpenAddDancersToRoom={handleOpenAddDancersToRoom}
						/>
					</YStack>
				)}
			/>
		</YStack>
	);
}
