import * as SQLite from 'expo-sqlite';

export const openDatabase = async () => {
	return await SQLite.openDatabaseAsync('dance-tracker.db');
};

export const createTables = async () => {
	const db = await openDatabase();

	await db
		.execAsync(
			`
    CREATE TABLE IF NOT EXISTS users (
      userId TEXT NOT NULL PRIMARY KEY,
      name INTEGER NOT NULL,
      status TEXT NOT NULL,
      room TEXT,
      type TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS rooms (
      roomId TEXT NOT NULL PRIMARY KEY,
      name INTEGER NOT NULL,
      status TEXT NOT NULL,
      timestamp INTEGER NOT NULL
    );

  
    `
		)
		.catch((err) => console.log(err));

	console.log('Database created');
};

export const dropTables = async () => {
	const db = await openDatabase();

	await db.execAsync(`
    DROP TABLE IF EXISTS users;
    `);

	console.log('Database deleted');
};
