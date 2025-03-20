import { RoomType } from '@/types/rooms';
import { UserType } from '@/types/users';
import React, { useState } from 'react';
import {
	Card,
	Checkbox,
	H4,
	Separator,
	Sheet,
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
						{dancers?.map((dancer) => (
							<YStack>
								<Card>
									<Card.Header>
										<XStack justify='space-between'>
											<Text>{dancer.name}</Text>

											<Checkbox
											// id={id} size={size} {...checkboxProps}
											>
												<Checkbox.Indicator>
													{/* <CheckIcon /> */}
												</Checkbox.Indicator>
											</Checkbox>
										</XStack>
									</Card.Header>
									<Card.Footer> </Card.Footer>
								</Card>
							</YStack>
						))}
						{/* <XStack alignItems='center'>
										<XStack flex={1}>
											<Label>Item</Label>
										</XStack>
										<SelectBox
											id={`${_package.packageId}`}
											label='Items'
											placeholder={'Select Item'}
											size={'$2'}
											value={selectedItem}
											setValue={setSelectedItem}
											native
											items={order?.items.filter(
												(item) => item.status === 'Pending'
											)}
											identifier={'itemId'}
										/>
									</XStack>
									<XStack alignItems='center' gap={'$5'}>
										<XStack>
											<Label>Quantity</Label>
										</XStack>
										<Input
											width={60}
											keyboardType='number-pad'
											onChangeText={setQuantity}
											value={quantity}
											returnKeyType='done'
											onFocus={() => setSnapPoints(keypadSnapPoints)}
											onBlur={() => setSnapPoints(initialSnapPoints)}
										/>
										{selectedItem && (
											<>
												<XStack>
													<Label>Quantity Available:</Label>
												</XStack>
												<SizableText>{quantityAvailable}</SizableText>
											</>
										)}
									</XStack>
									<Separator marginVertical={5} />
									<Button onPress={handleAddLineItemToPackage} theme='accent'>
										Add to Package
									</Button> */}
					</YStack>
				</Sheet.Frame>
			</Sheet>
		</>
	);
};
