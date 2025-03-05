import { FlatList, Pressable, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useClubStore } from '@/store/store';
import { router, useGlobalSearchParams } from 'expo-router';

export default function ModalScreen() {
	const { rooms, dancers, updateDancers, updateRooms } = useClubStore(
		(state) => state
	);

	const { roomId } = useGlobalSearchParams();

	const handlePress = (selectedDancer) => {
		const timestamp = new Date().getTime();

		const newDancers = dancers.map((dancer) =>
			dancer.id === selectedDancer.id
				? { ...dancer, status: 'Private Dance' }
				: dancer
		);

		const newRooms = rooms.map((room) =>
			room.id === roomId
				? {
						...room,
						status: 'Occupied',
						dancer: selectedDancer.name,
						time: timestamp,
				  }
				: room
		);

		updateDancers(newDancers);
		updateRooms(newRooms);

		router.back();
	};

	return (
		<View style={styles.container}>
			<View style={styles.dancersContainer}>
				<FlatList
					data={dancers.filter((dancer) => dancer.status === 'On Floor')}
					keyExtractor={(item) => item?.id}
					renderItem={({ item }) => (
						<View style={styles.roomContainer}>
							<View style={styles.infoContainer}>
								<Text>{item?.name}</Text>
								<Text>{item?.status}</Text>
							</View>
							<View style={styles.plusContainer}>
								<Pressable onPress={() => handlePress(item)}>
									<Text style={styles.plusSign}>+</Text>
								</Pressable>
							</View>
						</View>
					)}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
	roomContainer: {
		borderColor: 'black',
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
		fontSize: 36,
		fontWeight: 'bold',
	},
	plusContainer: {
		borderColor: 'black',
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 8,
	},
	infoContainer: {
		flex: 1,
	},
});
