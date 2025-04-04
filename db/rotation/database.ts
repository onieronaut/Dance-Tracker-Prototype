import { v4 as uuidv4 } from 'uuid';
import { openDatabase } from '../database';
import { UserType } from '@/types/users';
import { RotationType } from '@/types/rotation';
import dayjs from 'dayjs';

export const getInitialQueueRotation = async () => {
	const db = await openDatabase();

	const rotation: RotationType[] = await db.getAllAsync(
		`SELECT * FROM rotation WHERE type = 'queue'`
	);

	console.log('Initial queue rotation fetched');

	return rotation;
};

export const getRotation = async () => {
	const db = await openDatabase();

	const rotation: RotationType[] = await db.getAllAsync(
		`SELECT * FROM rotation`
	);

	console.log('Rotation fetched');

	return rotation;
};

export const getStageRotation = async () => {
	const db = await openDatabase();

	const rotation: RotationType[] = await db.getAllAsync(
		`
	SELECT 
    rotation.rotationId, 
    rotation.name, 
    rotation.position, 
    rotation.type, 
    rotation.available, 
    rotation.userId, 
    user.name AS userName, 
    user.status, 
    user.timestamp 
	FROM rotation 
	JOIN users AS user ON user.userId = rotation.userId;
	WHERE type = 'stage'
	`
	);

	console.log('Stage rotation fetched');

	return rotation;
};

export const getQueueRotation = async () => {
	const db = await openDatabase();

	const rotation: RotationType[] = await db.getAllAsync(
		`
	SELECT 
    rotation.rotationId, 
    rotation.name, 
    rotation.position, 
    rotation.type, 
    rotation.available, 
    rotation.userId, 
    user.name AS userName, 
    user.status, 
    user.timestamp 
	FROM rotation 
	JOIN users AS user ON user.userId = rotation.userId;`
	);

	console.log('Queue rotation fetched');

	return rotation;
};

export const assignUser = async (userId: string) => {
	const db = await openDatabase();

	const userRotationId = uuidv4();
	const timestamp = dayjs().unix() * 1000;

	const rotation = await getInitialQueueRotation();

	const availableSlot = rotation.find((slot) => slot.available === 1);

	await db.runAsync(
		`UPDATE rotation SET userId = ?, available = false WHERE rotationId = ?;`,
		[userId, availableSlot.rotationId]
	);

	await db.runAsync(`UPDATE users SET rotationId = ? WHERE userId = ?;`, [
		availableSlot.rotationId,
		userId,
	]);

	await db.runAsync(
		`INSERT INTO user_rotation (userRotationId, userId, rotationId, startTime, endTime) VALUES (?, ?, ?, ?, 0);`,
		[userRotationId, userId, availableSlot.rotationId, timestamp]
	);

	return console.log('User assigned');
};

export const updateRotation = async (updatedRotation: RotationType[]) => {
	const db = await openDatabase();

	for (const slot of updatedRotation) {
		await db.runAsync(`UPDATE rotation SET userId = ? WHERE rotationId = ?;`, [
			slot.userId,
			slot.rotationId,
		]);
	}

	// update user rotation table

	const rotation = await getQueueRotation();

	return rotation;
};

export const nextSong = async () => {
	const db = await openDatabase();

	const rotation = await getRotation();

	for (const [index, slot] of rotation.entries()) {
		console.log('x', slot);

		await db.runAsync(`UPDATE rotation SET userId = ? WHERE rotationId = ?`, [
			rotation[index + 1].userId,
			slot.rotationId,
		]);
	}

	return console.log('Rotation incremented');
};
