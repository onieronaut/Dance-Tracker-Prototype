import * as SQLite from 'expo-sqlite';
import {
	initializeRooms,
	initializeRotation,
	initializeUsers,
} from './startup/database';

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
      name TEXT NOT NULL,
      status TEXT NOT NULL,
      roomId TEXT,
      rotationId TEXT,
      type TEXT NOT NULL,
      timestamp INTEGER
    );

    CREATE TABLE IF NOT EXISTS rooms (
      roomId TEXT NOT NULL PRIMARY KEY,
      name TEXT NOT NULL,
      status TEXT NOT NULL,
      timestamp INTEGER NOT NULL,
      sessionId TEXT
    );

    CREATE TABLE IF NOT EXISTS sessions (
      sessionId TEXT NOT NULL PRIMARY KEY,
      roomId TEXT NOT NULL,
      startTime INTEGER NOT NULL,
      endTime INTEGER NOT NULL,
      status TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_sessions (
      userSessionId TEXT NOT NULL PRIMARY KEY,
      sessionId TEXT NOT NULL,
      roomId TEXT NOT NULL,
      userId TEXT NOT NULL,
      startTime INTEGER NOT NULL,
      endTime INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(userId),
      FOREIGN KEY (sessionId) REFERENCES sessions(sessionId),
      FOREIGN KEY (roomId) REFERENCES rooms(roomId)
    );

    CREATE TABLE IF NOT EXISTS rotation (
      rotationId TEXT NOT NULL PRIMARY KEY,
      name TEXT NOT NULL,
      position NUMBER NOT NULL,
      type TEXT NOT NULL,
      userId TEXT,
      available BOOLEAN DEFAULT TRUE
    );

    CREATE TABLE IF NOT EXISTS user_rotation (
      userRotationId TEXT NOT NULL PRIMARY KEY,
      userId TEXT NOT NULL,
      rotationId TEXT NOT NULL,
      startTime NUMBER NOT NULL,
      endTime NUMBER NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(userId),
      FOREIGN KEY (rotationId) REFERENCES rotation(rotationId)
    )
    
    `
		)
		.catch((err) => console.log(err));

	// await initializeUsers();
	// await initializeRooms();
	// await initializeRotation();

	console.log('Database created');
};

export const dropTables = async () => {
	const db = await openDatabase();

	await db.execAsync(`
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS rooms;
    DROP TABLE IF EXISTS sessions;
    DROP TABLE IF EXISTS user_sessions;
    DROP TABLE IF EXISTS rotation;
    DROP TABLE IF EXISTS user_rotation;
    `);

	console.log('Database deleted');
};
