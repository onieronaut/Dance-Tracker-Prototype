import { RotationItem } from '@/components/RotationItem';
import { getDancers } from '@/db/users/database';
import { UserType } from '@/types/users';
import { useQuery } from '@tanstack/react-query';
import { useFocusEffect } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Text, YStack } from 'tamagui';

export default function RotationScreen() {
	const { data: dancers, refetch: refetchDancers } = useQuery({
		queryKey: ['dancers'],
		queryFn: getDancers,
	});

	useFocusEffect(() => {
		refetchDancers();
	});

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
