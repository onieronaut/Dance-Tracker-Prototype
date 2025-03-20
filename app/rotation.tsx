import { RotationItem } from '@/components/RotationItem';
import { getDancers } from '@/db/users/database';
import { UserType } from '@/types/users';
import { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Text, YStack } from 'tamagui';

export default function RotationScreen() {
	const [dancers, setDancers] = useState<UserType[]>([]);

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
		<YStack flex={1}>
			<FlatList
				data={dancers}
				keyExtractor={(item) => item.userId}
				renderItem={({ item }) => (
					<YStack m={'$2'}>
						<RotationItem dancer={item} />
					</YStack>
				)}
			/>
		</YStack>
	);
}
