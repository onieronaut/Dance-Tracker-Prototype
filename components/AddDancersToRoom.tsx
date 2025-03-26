import { startSession } from '@/db/sessions/database';
import { RoomType } from '@/types/rooms';
import { UserType } from '@/types/users';
import { Check, CheckCircle2 } from '@tamagui/lucide-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useLayoutEffect, useState } from 'react';
import {
	Button,
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
	const initialSnapPoints = [90, 100];
	const [position, setPosition] = React.useState(0);
	const [snapPoints, setSnapPoints] = useState(initialSnapPoints);
	const [selectedOptions, setSelectedOptions] = useState({});

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: ({ roomId, payload }: { roomId: string; payload: string[] }) =>
			startSession(roomId, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['rooms'] });
		},
	});

	const handleCheckboxChange = (id: string) => {
		setSelectedOptions((prevState) => ({
			...prevState,
			[id]: !prevState[id],
		}));
	};

	const handleClose = () => {
		setOpen(false);
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
		const payload = Object.entries(selectedOptions)
			.filter(([key, value]) => value === true)
			.map(([key]) => key);

		mutation.mutate({ roomId: selectedRoom.roomId, payload });
		console.log(mutation);

		handleClose();
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
				<Sheet.Frame p='$4'>
					<YStack flex={1} width={'100%'} gap='$2'>
						<H4 text='center'>Add Dancers to {selectedRoom?.name}</H4>
						<Separator my={5} />

						<Sheet.ScrollView>
							<YStack gap={'$3'}>
								{dancers
									?.filter((dancer) => dancer.status === 'Active')
									.map((dancer) => (
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
						<Button onPress={handleSubmit} icon={<CheckCircle2 size={18} />}>
							Start Session
						</Button>
					</YStack>
				</Sheet.Frame>
			</Sheet>
		</>
	);
};
