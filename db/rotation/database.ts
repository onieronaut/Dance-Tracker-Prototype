import { v4 as uuidv4 } from 'uuid';
import { openDatabase } from '../database';
import { UserType } from '@/types/users';
import { RotationType } from '@/types/rotation';
import dayjs from 'dayjs';

export const getRotation = async () => {
	const db = await openDatabase();

	const rotation: RotationType[] = await db.getAllAsync(
		'SELECT * FROM rotation;'
	);

	return rotation;
};

export const assignUser = async (userId: string) => {
	const db = await openDatabase();

	const userRotationId = uuidv4();
	const timestamp = dayjs().unix() * 1000;

	const rotation = await getRotation();

	// find first available rotation slot and insert user

	rotation.find((slot) => slot);

	await db.runAsync(
		`INSERT INTO user_rotation (userRotationId, userId, rotationId, startTime, endTime) VALUES (?, ?, ?, ?, 0);`,
		[userRotationId, userId, timestamp]
	);
};
