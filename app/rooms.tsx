import { AddDancersToRoom } from '@/components/AddDancersToRoom';
import { RoomItem } from '@/components/RoomItem';
import { getRooms } from '@/db/rooms/database';
import { getSession, getSessions } from '@/db/sessions/database';
import { getDancers } from '@/db/users/database';
import { RoomType } from '@/types/rooms';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useFocusEffect } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, View, useWindowDimensions } from 'react-native';
import { ScrollView, Text, XStack, YStack } from 'tamagui';

export default function RoomsScreen() {
	const [open, setOpen] = useState(false);
	const [selectedRoom, setSelectedRoom] = useState<RoomType>();
	const queryClient = useQueryClient();

	const sessionId = '75eb5083-b676-411c-ab31-0cc597b4e042';

	const { data: rooms, refetch: refetchRooms } = useQuery({
		queryKey: ['rooms'],
		queryFn: getRooms,
	});

	const { data: dancers, refetch: refetchDancers } = useQuery({
		queryKey: ['dancers'],
		queryFn: getDancers,
	});

	const { data: sessions, refetch: refetchSessions } = useQuery({
		queryKey: ['sessions'],
		queryFn: getSessions,
	});

	const { data: session } = useQuery({
		queryKey: ['session', sessionId],
		queryFn: () => getSession(sessionId),
	});

	console.log('x', session);
	console.log('y', sessions);

	useFocusEffect(() => {
		refetchRooms();
		refetchDancers();
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
		<>
			<AddDancersToRoom
				open={open}
				setOpen={setOpen}
				dancers={dancers}
				selectedRoom={selectedRoom}
			/>
			<ScrollView flex={1}>
				<XStack flexWrap='wrap' gap={'$3'} p={'$5'} justify='space-between'>
					{rooms?.map((room) => (
						<XStack width={'32%'} key={room.roomId}>
							<RoomItem
								room={room}
								handleOpenAddDancersToRoom={handleOpenAddDancersToRoom}
							/>
						</XStack>
					))}
				</XStack>
			</ScrollView>
		</>
	);
}
