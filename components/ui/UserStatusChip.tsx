import {
	Feather,
	MaterialCommunityIcons,
	MaterialIcons,
} from '@expo/vector-icons';
import React from 'react';
import { Button } from 'tamagui';
import { CheckCircle2, CircleX, Users } from '@tamagui/lucide-icons';

interface UserStatusChipPropsType {
	status: string;
}

export const UserStatusChip = ({ status }: UserStatusChipPropsType) => {
	const ChipIcon = () => {
		switch (status) {
			case 'Active':
				return <CheckCircle2 size={'$1'} />;
			case 'In Room':
				return <Users size={'$1'} />;
			case 'Inactive':
				return <CircleX size={'$1'} />;
		}
	};

	function getColor() {
		switch (status) {
			case 'Active':
				return '#28a745';
			case 'In Room':
				return '#FFC107E7';
			case 'Inactive':
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
