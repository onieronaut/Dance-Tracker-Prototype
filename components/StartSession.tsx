import { FragmentType, getFragmentData } from '@/graphql/generated';
import {
	ActiveDancersDocument,
	RoomFragmentDoc,
	RoomsDocument,
	StartSessionDocument,
} from '@/graphql/generated/graphql';
import { useMutation, useQuery } from '@apollo/client';
import { Check, CheckCircle2 } from '@tamagui/lucide-icons';
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

export const StartSession = (props: {
	open: boolean;
	handleClose: () => void;
	selectedRoom: FragmentType<typeof RoomFragmentDoc>;
}) => {
	const { open, handleClose } = props;

	const selectedRoom = getFragmentData(RoomFragmentDoc, props.selectedRoom);

	const initialSnapPoints = [90, 100];
	const [position, setPosition] = React.useState(0);
	const [snapPoints, setSnapPoints] = useState(initialSnapPoints);
	const [selectedOptions, setSelectedOptions] = useState({});

	const { loading, error, data } = useQuery(ActiveDancersDocument);

	const [startSession, {}] = useMutation(StartSessionDocument, {
		refetchQueries: [RoomsDocument, ActiveDancersDocument],
	});

	const handleCheckboxChange = (id: string) => {
		setSelectedOptions((prevState) => ({
			...prevState,
			[id]: !prevState[id],
		}));
	};

	useLayoutEffect(() => {
		if (loading) return;

		setSelectedOptions(() => {
			return data.users?.reduce((acc, dancer) => {
				acc[dancer?.id] = false;
				return acc;
			}, {});
		});
	}, [open, data]);

	const handleSubmit = async () => {
		const userIds = Object.entries(selectedOptions)
			.filter(([key, value]) => value === true)
			.map(([key]) => key);

		const userSessionsData = Object.entries(selectedOptions)
			.filter(([key, value]) => value === true)
			.map(([key]) => {
				return {
					userId: key,
					roomId: selectedRoom.id,
				};
			});

		startSession({
			variables: {
				roomId: selectedRoom.id,
				data: userSessionsData,
				userIds: userIds,
			},
		});

		handleClose();
	};

	if (loading) return <Text>Loading...</Text>;

	return (
		<>
			<Sheet
				forceRemoveScrollEnabled={open}
				modal={true}
				open={open}
				onOpenChange={handleClose}
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
								{data.users.map((dancer) => (
									<Card onPress={() => handleCheckboxChange(dancer.id)}>
										<Card.Header>
											<XStack
												justify='space-between'
												style={{ alignItems: 'center' }}>
												<Text>{dancer.name}</Text>

												<Checkbox
													id={dancer.id}
													checked={selectedOptions[dancer.id]}
													onCheckedChange={() =>
														handleCheckboxChange(dancer.id)
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
