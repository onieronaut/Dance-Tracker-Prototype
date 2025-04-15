import React, { useEffect, useState } from 'react';
import { Card, H2, Text, XStack, YStack } from 'tamagui';
import { UserStatusChip } from './ui/UserStatusChip';
import { Hourglass } from '@tamagui/lucide-icons';
import dayjs, { duration } from 'dayjs';
import { DocumentType } from '@/graphql/generated';
import { StageRotationDocument } from '@/graphql/generated/graphql';

dayjs.extend(duration);

export const StageRotationItem = (props: {
	slot: DocumentType<typeof StageRotationDocument>['rotation'][0];
}) => {
	const { slot } = props;

	return (
		<Card>
			<Card.Header>
				<XStack justify='space-between'>
					<H2>{slot.name}</H2>
					<H2>{slot.currentUserRotation?.user?.name}</H2>
					<UserStatusChip status={slot.currentUserRotation?.user?.status} />
				</XStack>
			</Card.Header>
			<Card.Footer />
		</Card>
	);
};
