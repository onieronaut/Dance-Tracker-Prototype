import { defaultConfig, shorthands } from '@tamagui/config/v4';
import { createTamagui } from 'tamagui';
import { themes } from './themes';

export const tamaguiConfig = createTamagui({
	...defaultConfig,
	shorthands,
	themes,
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
	interface TamaguiCustomConfig extends Conf {}
}
