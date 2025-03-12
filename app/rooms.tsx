import { getRooms } from '@/db/rooms/database';
import { getDancers } from '@/db/users/database';
import { useEffect, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'tamagui';

export default function RoomsScreen() {
	const [dancers, setDancers] = useState([]);
	const [rooms, setRooms] = useState([]);

	console.log(dancers);

	const handleGetDancers = async () => {
		try {
			const res = await getDancers();
			setDancers(res);
		} catch (err) {
			console.log(err);
		}
	};

	const handleGetRooms = async () => {
		try {
			const res = await getRooms();
			setRooms(res);
		} catch (err) {
			console.log(err);
		}
	};

	useLayoutEffect(() => {
		handleGetDancers();
		handleGetRooms();
	}, []);

	return (
		<View>
			{dancers.map((dancer) => (
				<>
					<Text>{dancer.name}</Text>
					<Text>{dancer.status}</Text>
				</>
			))}
			{rooms.map((room) => (
				<>
					<Text>{room.name}</Text>
					<Text>{room.status}</Text>
				</>
			))}
		</View>
	);
}
