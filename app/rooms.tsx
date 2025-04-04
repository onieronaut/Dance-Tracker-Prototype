import { RoomsList } from '@/components/rooms/RoomsList';
import { gql } from '@/graphql';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { ScrollView, Text, XStack } from 'tamagui';

export const RoomsQueryDocument = gql(/* GraphQL */ `
	query Rooms {
		rooms {
			...RoomsList
			# ...Room
		}
	}
`);

// type Room = DocumentType<typeof RoomFragment>;

export default function RoomsScreen() {
	const [open, setOpen] = useState(false);
	const [selectedRoom, setSelectedRoom] = useState<any>();

	const { loading, error, data } = useQuery(RoomsQueryDocument);

	// const { data: dancers, refetch: refetchDancers } = useQuery({
	// 	queryKey: ['dancers'],
	// 	queryFn: getDancers,
	// });

	// useFocusEffect(() => {
	// 	refetchRooms();
	// 	refetchDancers();
	// });

	// console.log('[rooms]', data?.rooms);

	const handleOpenAddDancersToRoom = (roomId: string) => {
		// const room = rooms.find((room) => room.id === roomId);

		// setSelectedRoom(room);
		setOpen(true);
	};

	if (loading) return <Text>Loading</Text>;

	if (error) return <Text>Error</Text>;

	return (
		<>
			{/* <AddDancersToRoom
				open={open}
				setOpen={setOpen}
				dancers={dancers}
				selectedRoom={selectedRoom}
			/> */}
			<ScrollView flex={1}>
				<XStack flexWrap='wrap' gap={'$3'} p={'$5'} justify='space-between'>
					<RoomsList rooms={data?.rooms} />
				</XStack>
			</ScrollView>
		</>
	);
}
