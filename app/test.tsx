import {
	AddRoomDocument,
	Rotation,
	TestDocument,
	UpdateRotationDocument,
} from '@/graphql/generated/graphql';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { memo, useCallback, useEffect, useState } from 'react';
import {
	FlatList,
	InteractionManager,
	Pressable,
	TouchableOpacity,
} from 'react-native';
import { Button, Form, H6, Input, Spinner, Text, View, YStack } from 'tamagui';
import { client } from './_layout';
import { DocumentType, gql } from '@/graphql/generated';
import DraggableFlatList from 'react-native-draggable-flatlist';

import ReorderableList, {
	ReorderableListIndexChangeEvent,
	ReorderableListReorderEvent,
	reorderItems,
	useReorderableDrag,
} from 'react-native-reorderable-list';
import { runOnJS } from 'react-native-reanimated';

export default function TestScreen() {
	const { data, loading, error } = useQuery(TestDocument);

	// const { data, loading, error } = useSubscription(TestDocument);

	const [dragData, setDragData] = useState([]);

	useEffect(() => {
		if (data?.rotation) {
			console.log('x');

			setDragData(data?.rotation);
		}
	}, [data?.rotation]);

	const [updateRotation] = useMutation(UpdateRotationDocument, {
		update: (cache, { data: { updateRotationMany } }) => {
			const data = { ...cache.readQuery({ query: TestDocument }) };

			let rotation = [...updateRotationMany[0].returning];
			data.rotation = rotation;
			cache.writeQuery({ query: TestDocument, data });
		},
		refetchQueries: [TestDocument],
		onCompleted: (result) => {
			const rotation = result.updateRotationMany.map(
				(slot) => slot.returning[0]
			);
			console.log('[res]', rotation);

			setDragData([...rotation]);
		},
	});

	// const [addRoom] = useMutation(AddRoomDocument, {
	// 	update: (cache, { data: { insertRoomsOne } }) => {
	// 		const data = { ...cache.readQuery({ query: TestDocument }) };
	// 		data.rooms = [...data.rooms, insertRoomsOne];
	// 		cache.writeQuery({ query: TestDocument, data });
	// 	},
	// 	refetchQueries: [TestDocument],
	// });
	// console.log(cache);

	// const newRoom: any = {
	// 	__typename: 'Rooms',
	// 	id: '2cdf8e7c-9c86-42b0-84c',
	// 	// id: '2cdf8e7c-9c86-42b0-84ce-b4fdd95d193d',
	// 	name: 'Room 100',
	// 	status: 'Open',
	// };
	// console.log('[new]', newRoom);

	// if (newRoom) {
	// 	// Read existing rooms from the cache
	// 	const existingRooms = cache.readQuery({ query: TestDocument });

	// 	const payload = [...existingRooms.rooms, newRoom];

	// 	console.log('[2222222222222]', payload);
	// 	// Add the new room to the cache manually
	// 	cache.writeQuery({
	// 		query: TestDocument,
	// 		data: {
	// 			rooms: [...existingRooms.rooms, newRoom],
	// 		},
	// 	});
	// }
	// },
	// refetchQueries: [TestDocument],
	// });

	const handleSubmit = () => {
		// addRoom({
		// 	variables: { name: 'Room 14' },
		// 	optimisticResponse: {
		// 		insertRoomsOne: {
		// 			id: 'temp-id',
		// 			__typename: 'Rooms',
		// 			name: 'TEST',
		// 			status: 'TEST',
		// 		},
		// 	},
		// });
		// setTimeout(() => {
		// 	const cacheData = client.extract();
		// 	console.log(JSON.stringify(cacheData, null, 2));
		// }, 100);
	};

	const handleOnDragEnd = ({ data }: { data: Rotation[] }) => {
		setDragData(data);

		InteractionManager.runAfterInteractions(() => {
			const updateRotations = data.map((slot, index) => {
				if (index === data.length - 1) {
					return {
						where: { id: { _eq: slot.id } },
						_set: { index: data[0].index },
					};
				} else {
					return {
						where: { id: { _eq: slot.id } },
						_set: { index: data[index + 1].index },
					};
				}
			});

			const optimisticResponse = data.map((slot, index) => {
				if (index === data.length - 1) {
					return {
						id: slot.id,
						index: data[0].index,
						name: slot.name,
					};
				} else {
					return {
						id: slot.id,
						index: data[index + 1].index,
						name: slot.name,
					};
				}
			});

			updateRotation({
				variables: { updates: updateRotations },
				optimisticResponse: {
					__typename: 'mutation_root',
					updateRotationMany: [
						{
							__typename: 'RotationMutationResponse',
							returning: optimisticResponse,
						},
					],
				},
			});
		});
	};

	const handleReorder = ({ from, to }: ReorderableListReorderEvent) => {
		const newOrder = reorderItems(dragData, from, to);

		setDragData((value) => {
			console.log('[prev]', value);

			const x = reorderItems(value, from, to);
			console.log('[new]', x);

			return x;
		});

		InteractionManager.runAfterInteractions(() => {
			console.log('[copy]', newOrder);

			const updateRotations = newOrder.map((slot, index) => {
				const baseIndex = 3;

				// if (index === newOrder.length - 1) {
				// 	return {
				// 		where: { id: { _eq: slot.id } },
				// 		_set: { index:  },
				// 	};
				// } else {
				return {
					where: { id: { _eq: slot.id } },
					_set: { index: baseIndex + index },
				};
				// }
			});

			// const optimisticResponse = dragData.map((slot, index) => {
			// 	// if (index === dragData.length - 1) {
			// 	// 	return {
			// 	// 		__typename: 'Rotation',
			// 	// 		id: slot.id,
			// 	// 		index: slot.id,
			// 	// 		name: slot.name,
			// 	// 	};
			// 	// } else {
			// 	return {
			// 		__typename: 'Rotation',
			// 		id: slot.id,
			// 		index: slot.index,
			// 		name: slot.name,
			// 	};
			// 	// }
			// });

			const optimisticResponse = reorderItems(dragData, from, to);

			console.log('[op]', optimisticResponse);
			console.log('[update]', updateRotations);

			updateRotation({
				variables: { updates: updateRotations },
				optimisticResponse: {
					__typename: 'mutation_root',
					updateRotationMany: [
						{
							__typename: 'RotationMutationResponse',
							returning: optimisticResponse,
						},
					],
				},
			});
		});
	};

	const Card: React.FC<any> = memo(({ id, color, height }) => {
		const drag = useReorderableDrag();

		return (
			<Pressable
				onLongPress={drag}
				style={{ backgroundColor: 'red', padding: 24 }}>
				<Text>{id}</Text>
			</Pressable>
		);
	});

	const renderItem = ({ item }: any) => <Card {...item} />;

	if (loading) return <Text>Loading...</Text>;

	return (
		<YStack flex={1}>
			<ReorderableList
				data={dragData}
				onReorder={handleReorder}
				renderItem={renderItem}
				// IMPORTANT: Do not use the current index as key.
				// Always use a stable and unique key for each item.
				keyExtractor={(item) => item.id}
			/>
			{/* <DraggableFlatList
				data={dragData}
				keyExtractor={(item) => item.index.toString()}
				onDragEnd={handleOnDragEnd}
				scrollEnabled
				activationDistance={10}
				renderItem={({ item, drag, isActive }) => (
					// <YStack my={'$2'}>
					<TouchableOpacity onLongPress={drag} disabled={isActive}>
						<View style={{ backgroundColor: 'red', padding: 24 }}>
							<Text>{item.name}</Text>
						</View>
					</TouchableOpacity>
					// </YStack>
				)}
			/> */}
		</YStack>
	);
}
