import { UserType } from '@/types/users';
import React from 'react';
import { Card, H2, XStack, YStack } from 'tamagui';

interface RotationItemPropsType {
	dancer: UserType;
}

export const RotationItem = ({ dancer }: RotationItemPropsType) => {
	return (
		<Card>
			<Card.Header>
				<XStack justify='space-between'>
					<H2>{dancer.name}</H2>
					{/* <StatusChip status={dancer.status} /> */}
				</XStack>
			</Card.Header>
			<Card.Footer />
			{/* any other components */}
			<Card.Background />
		</Card>
	);
};
