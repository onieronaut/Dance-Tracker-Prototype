import { startSession } from '@/db/sessions/database';
import { RoomType } from '@/types/rooms';
import { UserType } from '@/types/users';
import { Check } from '@tamagui/lucide-icons';
import React, { useLayoutEffect, useState } from 'react';
import {
	Button,
	Card,
	Checkbox,
	CheckboxProps,
	Form,
	H4,
	Label,
	ScrollView,
	Separator,
	Sheet,
	Spinner,
	Text,
	XStack,
	YStack,
} from 'tamagui';

interface AddDancersToRoomPropsType {
	setOpen: any;
	open: boolean;
	dancers: UserType[];
	selectedRoom: RoomType;
}

export const AddDancersToRoom = ({
	open,
	setOpen,
	dancers,
	selectedRoom,
}: AddDancersToRoomPropsType) => {
	const [position, setPosition] = React.useState(0);

	// const [order, setOrder] = useState<OrderType>();
	const [selectedItem, setSelectedItem] = useState();
	const [quantityAvailable, setQuantityAvailable] = useState(0);
	const [quantity, setQuantity] = useState('');
	const [alert, setAlert] = useState(false);
	const [error, setError] = useState({});

	const initialSnapPoints = [90, 100];
	const keypadSnapPoints = [70, 70];

	const [snapPoints, setSnapPoints] = useState(initialSnapPoints);

	const [selectedOptions, setSelectedOptions] = useState({});

	const handleCheckboxChange = (id: string) => {
		setSelectedOptions((prevState) => ({
			...prevState,
			[id]: !prevState[id],
		}));
	};

	useLayoutEffect(() => {
		if (!dancers) return;

		setSelectedOptions(() => {
			return dancers?.reduce((acc, dancer) => {
				acc[dancer?.userId] = false;
				return acc;
			}, {});
		});
	}, [open]);

	const handleSubmit = async () => {
		console.log(selectedOptions);

		const payload = Object.entries(selectedOptions)
			.filter(([key, value]) => value === true)
			.map(([key]) => key);

		try {
			await startSession(selectedRoom.roomId, payload);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Sheet
				forceRemoveScrollEnabled={open}
				modal={true}
				open={open}
				onOpenChange={setOpen}
				snapPoints={snapPoints}
				snapPointsMode={'percent'}
				dismissOnSnapToBottom
				position={position}
				onPositionChange={setPosition}
				zIndex={100_000}
				animation='medium'>
				<Sheet.Overlay
					animation='lazy'
					enterStyle={{ opacity: 0 }}
					exitStyle={{ opacity: 0 }}
				/>
				<Sheet.Frame
					p='$4'
					justify='center'
					// align='center'
				>
					<YStack flex={1} width={'100%'} gap='$2'>
						<H4>Add Dancers to {selectedRoom?.name}</H4>
						<Separator my={5} />

						<Sheet.ScrollView>
							<YStack gap={'$3'}>
								{dancers?.map((dancer) => (
									<Card onPress={() => handleCheckboxChange(dancer.userId)}>
										<Card.Header>
											<XStack
												justify='space-between'
												style={{ alignItems: 'center' }}>
												<Text>{dancer.name}</Text>

												<Checkbox
													id={dancer.userId}
													checked={selectedOptions[dancer.userId]}
													onCheckedChange={() =>
														handleCheckboxChange(dancer.userId)
													}
													size='$6'>
													<Checkbox.Indicator>
														<Check />
													</Checkbox.Indicator>
												</Checkbox>
											</XStack>
										</Card.Header>
									</Card>
								))}
							</YStack>
						</Sheet.ScrollView>
						<Button onPress={handleSubmit}>Submit</Button>
					</YStack>
				</Sheet.Frame>
			</Sheet>
		</>
	);
};
