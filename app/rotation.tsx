import { RotationItem } from '@/components/RotationItem';
import { getRotation } from '@/db/rotation/database';
import { getDancers } from '@/db/users/database';
import { UserType } from '@/types/users';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useFocusEffect } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, {
	RenderItemParams,
	ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { ScrollView, Text, YStack } from 'tamagui';

export default function RotationScreen() {
	const {
		data: dancers,
		refetch: refetchDancers,
		isLoading,
	} = useQuery({
		queryKey: ['dancers'],
		queryFn: getDancers,
	});

	const {
		data: rotation,
		// refetch: refetchDancers,
		// isLoading,
	} = useQuery({
		queryKey: ['rotation'],
		queryFn: getRotation,
	});

	console.log(rotation);

	const queryClient = useQueryClient();

	// const mutation = useMutation(updateData, {
	// 	onSuccess: (data) => {
	// 		//Invalidate and refetch data to keep UI in sync with server
	// 		queryClient.invalidateQueries({queryKey: ['dancers']});
	// 	},
	// });

	const handleOnDragEnd = ({ data }) => {
		// mutation.mutate(data);
	};

	const renderItem = ({ item, drag, isActive }: RenderItemParams<any>) => {
		return (
			<ScaleDecorator>
				<TouchableOpacity onLongPress={drag} disabled={isActive}>
					<Text>hi</Text>
				</TouchableOpacity>
			</ScaleDecorator>
		);
	};

	// useFocusEffect(() => {
	// 	refetchDancers();
	// });

	if (isLoading) return <Text>Loading...</Text>;

	return (
		<YStack flex={1}>
			<YStack gap={'$2'}>
				{rotation
					?.filter((slot) => slot.type === 'stage')
					.sort((a, b) => a.position - b.position)
					.map((slot) => (
						<RotationItem slot={slot} key={slot.rotationId} />
					))}
			</YStack>

			<YStack gap={'$2'}>
				<DraggableFlatList
					data={rotation
						?.filter((slot) => slot.type === 'queue')
						.sort((a, b) => a.position - b.position)}
					keyExtractor={(item) => item.rotationId}
					onDragEnd={handleOnDragEnd}
					scrollEnabled
					renderItem={({ item, drag, isActive }) => (
						// <YStack gap={'$2'}>
						<TouchableOpacity onLongPress={drag} disabled={isActive}>
							<RotationItem slot={item} />
						</TouchableOpacity>
						// </YStack>
					)}
				/>
			</YStack>
		</YStack>
	);
}
