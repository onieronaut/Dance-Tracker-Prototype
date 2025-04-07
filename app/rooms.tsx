import { StartSession } from '@/components/StartSession';
import { RoomsList } from '@/components/rooms/RoomsList';
import { FragmentType } from '@/graphql/generated';
import { RoomFragmentDoc, RoomsDocument } from '@/graphql/generated/graphql';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { ScrollView, Text, XStack } from 'tamagui';

type Room = FragmentType<typeof RoomFragmentDoc>;

export default function RoomsScreen() {
	const [open, setOpen] = useState(false);
	const [selectedRoom, setSelectedRoom] = useState<Room>();

	const { loading, error, data } = useQuery(RoomsDocument);

	const handleOpen = (roomId: string) => {
		const room = data.rooms.find((room) => room.id === roomId);

		setSelectedRoom(room);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	if (loading) return <Text>Loading</Text>;

	if (error) return <Text>Error</Text>;

	return (
		<>
			<StartSession
				open={open}
				handleClose={handleClose}
				selectedRoom={selectedRoom}
			/>
			<ScrollView flex={1}>
				<XStack flexWrap='wrap' gap={'$3'} p={'$5'} justify='space-between'>
					<RoomsList rooms={data?.rooms} handleOpen={handleOpen} />
				</XStack>
			</ScrollView>
		</>
	);
}
