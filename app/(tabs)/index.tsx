import { FlatList, Pressable, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ROOMS } from '@/constants/Rooms';
import { DANCERS } from '@/constants/Dancers';
import { Link } from 'expo-router';
import { useStore } from 'zustand';
import { useClubStore } from '@/store/store';
import dayjs from 'dayjs';
import { Room } from '@/components/Room';

export default function TabOneScreen() {
	const { dancers, rooms } = useClubStore((state) => state);

	return (
		<View style={styles.container}>
			<View style={styles.roomsContainer}>
				<FlatList
					data={rooms}
					keyExtractor={(item) => item?.id}
					renderItem={({ item }) => <Room item={item} />}
				/>
			</View>
			<View style={styles.dancersContainer}>
				<FlatList
					data={dancers}
					keyExtractor={(item) => item?.id}
					renderItem={({ item }) => (
						<View style={styles.dancerContainer}>
							<Text>{item?.name}</Text>
							<Text>Status: {item?.status}</Text>
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
	dancerContainer: {
		borderColor: 'white',
		borderWidth: 1,
		padding: 24,
		margin: 8,
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
