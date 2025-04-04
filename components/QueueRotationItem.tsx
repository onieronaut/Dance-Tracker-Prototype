import { UserType } from '@/types/users';
import React, { useEffect, useState } from 'react';
import { Card, H2, Text, XStack, YStack } from 'tamagui';
import { UserStatusChip } from './ui/UserStatusChip';
import { Hourglass } from '@tamagui/lucide-icons';
import dayjs from 'dayjs';
import { RotationType } from '@/types/rotation';

interface QueueRotationItemPropsType {
	slot: RotationType;
}

export const QueueRotationItem = ({ slot }: QueueRotationItemPropsType) => {
	const initialTime = '0:00';
	const [time, setTime] = useState(initialTime);

	useEffect(() => {
		if (slot.timestamp === 0) return;

		const intervalId = setInterval(() => {
			setTime(dayjs(new Date().getTime() - slot.timestamp).format('m:ss'));
		}, 1000);

		return () => clearInterval(intervalId);
	}, [slot.timestamp]);

	return (
		<Card>
			<Card.Header>
				<XStack justify='space-between' style={{ alignItems: 'center' }}>
					<H2>{slot.position}</H2>
					<H2>{slot.userName}</H2>
					<UserStatusChip status={slot.status} />
				</XStack>
				{slot.timestamp > 0 && (
					<XStack
						style={{ alignItems: 'center' }}
						justify='flex-end'
						gap={'$2'}>
						<Hourglass size={24} />
						<Text fontSize={'$8'} fontWeight={'bold'}>
							{time}
						</Text>
					</XStack>
				)}
			</Card.Header>
			<Card.Footer />
		</Card>
	);
};
