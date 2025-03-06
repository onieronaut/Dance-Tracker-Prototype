import { v4 as uuidv4 } from 'uuid';
import { openDatabase } from '../database';

export const createUser = async (data: any) => {
	const db = await openDatabase();

	const uniqueId = uuidv4();

	// await db.runAsync(`INSERT INTO boxes (boxId, name) VALUES (?, ?);`, [
	// 	uniqueId,
	// 	name,
	// ]);

	console.log('Box created');

	return;
};
