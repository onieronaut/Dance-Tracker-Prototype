import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Button, H1, XStack, YStack } from 'tamagui';
import { useEffect, useLayoutEffect } from 'react';
import { useFocusEffect } from 'expo-router';

export default function TabTwoScreen() {
	return (
		<XStack justify='center' flex={1}>
			<H1>Welcome</H1>
		</XStack>
	);
}
