import { getDancers } from '@/db/users/database';
import { useEffect, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'tamagui';

export default function RotationScreen() {
	const [dancers, setDancers] = useState([]);

	console.log(dancers);

	const handleGetDancers = async () => {
		try {
			const res = await getDancers();
			setDancers(res);
		} catch (err) {
			console.log(err);
		}
	};

	useLayoutEffect(() => {
		handleGetDancers();
	}, []);

	return (
		<View>
			{dancers.map((dancer) => (
				<>
					<Text>{dancer.name}</Text>
					<Text>{dancer.status}</Text>
				</>
			))}
		</View>
	);
}
