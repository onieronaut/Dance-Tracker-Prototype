import {
	Feather,
	MaterialCommunityIcons,
	MaterialIcons,
} from '@expo/vector-icons';
import React from 'react';
import { Button } from 'tamagui';
import { CheckCircle2, CircleX, Users } from '@tamagui/lucide-icons';

interface RoomStatusChipPropsType {
	status: string;
}

export const RoomStatusChip = ({ status }: RoomStatusChipPropsType) => {
	const ChipIcon = () => {
		switch (status) {
			case 'Open':
				return <CheckCircle2 size={'$1'} />;
			case 'In Use':
				return <Users size={'$1'} />;
			case 'Closed':
				return <CircleX size={'$1'} />;
		}
	};

	function getColor() {
		switch (status) {
			case 'Open':
				return '#28a745';
			case 'In Use':
				return '#FFC107E7';
			case 'Closed':
				return '#dc3545';
		}
	}

	return (
		<Button
			icon={<ChipIcon />}
			bg={getColor()}
			disabled
			size='$2'
			fontWeight={'bold'}>
			{status}
		</Button>
	);
};
