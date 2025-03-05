import { useClubStore } from '@/store/store';
import dayjs from 'dayjs';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from './Themed';

interface RoomPropsType {
	item: any;
}

export const Room = ({ item }: RoomPropsType) => {
	const { updateDancers, updateRooms, dancers, rooms } = useClubStore(
		(state) => state
	);

	const [time, setTime] = useState('0:00');

	useEffect(() => {
		if (item.time === null) return;

		const intervalId = setInterval(() => {
			setTime(dayjs(new Date().getTime() - item.time).format('m:ss'));
		}, 1000);

		return () => clearInterval(intervalId);
	}, [item.time]);

	const handlePress = (selectedRoom) => {
		const newDancers = dancers.map((dancer) =>
			dancer.name === selectedRoom.dancer
				? { ...dancer, status: 'On Floor' }
				: dancer
		);

		const newRooms = rooms.map((room) =>
			room.id === selectedRoom.id
				? {
						...room,
						status: 'Open',
						dancer: null,
						time: null,
				  }
				: room
		);

		updateDancers(newDancers);
		updateRooms(newRooms);
	};

	return (
		<View style={styles.roomContainer}>
			<View style={styles.infoContainer}>
				<Text>{item?.name}</Text>
				<Text>Status: {item?.status}</Text>
				<Text>Dancer: {item?.dancer}</Text>
				<Text>Time: {item?.time !== null && time}</Text>
			</View>
			{item.status === 'Open' && (
				<View style={styles.plusContainer}>
					<Link
						href={{ pathname: '/modal', params: { roomId: item.id } }}
						asChild>
						<View>
							<Text style={styles.plusSign}>+</Text>
						</View>
					</Link>
				</View>
			)}
			{item.status === 'Occupied' && (
				<View style={styles.plusContainer}>
					<Pressable onPress={() => handlePress(item)}>
						<Text style={styles.finish}>Finish</Text>
					</Pressable>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
	},
	roomContainer: {
		borderColor: 'white',
		borderWidth: 1,
		padding: 24,
		margin: 8,
		flexDirection: 'row',
		alignItems: 'center',
	},
	roomsContainer: {
		flex: 1,
	},
	dancersContainer: {
		flex: 1,
	},
	plusSign: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	finish: {
		fontSize: 12,
		fontWeight: 'bold',
	},
	plusContainer: {
		borderColor: 'white',
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 8,
	},
	infoContainer: {
		flex: 1,
	},
});
