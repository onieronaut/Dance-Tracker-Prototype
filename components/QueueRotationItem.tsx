import {
	DocumentType,
	FragmentType,
	getFragmentData,
} from '@/graphql/generated';
import {
	ChangeRotationDocument,
	QueueSlotFragmentDoc,
	RotationDocument,
} from '@/graphql/generated/graphql';
import { Hourglass } from '@tamagui/lucide-icons';
import dayjs, { duration } from 'dayjs';
import React, { memo, useEffect, useState } from 'react';
import { Card, H2, Text, XStack } from 'tamagui';
import { UserStatusChip } from './ui/UserStatusChip';
import { useIsActive, useReorderableDrag } from 'react-native-reorderable-list';
import { Pressable, TouchableOpacity } from 'react-native';

dayjs.extend(duration);

export const QueueRotationItem = memo(
	(props: { slot: DocumentType<typeof RotationDocument>['rotation'][0] }) => {
		const { slot } = props;

		const drag = useReorderableDrag();
		const isActive = useIsActive();

		const initialTime = '0:00';
		const [time, setTime] = useState(initialTime);

		useEffect(() => {
			if (slot.currentUserRotation?.user?.activeSession?.endTime !== null)
				return;

			const intervalId = setInterval(() => {
				const now = dayjs();
				const diff = now.diff(
					slot.currentUserRotation?.user?.activeSession?.startTime
				);
				const time = dayjs.duration(diff).format('mm:ss');

				setTime(time);
			}, 1000);

			return () => clearInterval(intervalId);
		}, [slot.currentUserRotation?.user?.activeSession]);

		return (
			<Pressable onLongPress={drag} disabled={isActive}>
				<Card>
					<Card.Header>
						<XStack justify='space-between' style={{ alignItems: 'center' }}>
							<H2>{slot.name}</H2>
							<H2>{slot.currentUserRotation?.user?.name}</H2>
							<UserStatusChip status={slot.currentUserRotation?.user?.status} />
						</XStack>
						{slot.currentUserRotation?.user?.activeSession && (
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
			</Pressable>
		);
	}
);
