/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  timestamptz: { input: string; output: string; }
  uuid: { input: string; output: string; }
};

/** columns and relationships of "active_session" */
export type ActiveSession = {
  __typename?: 'ActiveSession';
  /** An array relationship */
  activeUsers: Array<ActiveUsers>;
  /** An aggregate relationship */
  activeUsersAggregate: ActiveUsersAggregate;
  endTime?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  roomId?: Maybe<Scalars['uuid']['output']>;
  startTime?: Maybe<Scalars['timestamptz']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "active_session" */
export type ActiveSessionActiveUsersArgs = {
  distinctOn?: InputMaybe<Array<ActiveUsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ActiveUsersOrderBy>>;
  where?: InputMaybe<ActiveUsersBoolExp>;
};


/** columns and relationships of "active_session" */
export type ActiveSessionActiveUsersAggregateArgs = {
  distinctOn?: InputMaybe<Array<ActiveUsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ActiveUsersOrderBy>>;
  where?: InputMaybe<ActiveUsersBoolExp>;
};

/** aggregated selection of "active_session" */
export type ActiveSessionAggregate = {
  __typename?: 'ActiveSessionAggregate';
  aggregate?: Maybe<ActiveSessionAggregateFields>;
  nodes: Array<ActiveSession>;
};

/** aggregate fields of "active_session" */
export type ActiveSessionAggregateFields = {
  __typename?: 'ActiveSessionAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<ActiveSessionMaxFields>;
  min?: Maybe<ActiveSessionMinFields>;
};


/** aggregate fields of "active_session" */
export type ActiveSessionAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<ActiveSessionSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "active_session". All fields are combined with a logical 'AND'. */
export type ActiveSessionBoolExp = {
  _and?: InputMaybe<Array<ActiveSessionBoolExp>>;
  _not?: InputMaybe<ActiveSessionBoolExp>;
  _or?: InputMaybe<Array<ActiveSessionBoolExp>>;
  activeUsers?: InputMaybe<ActiveUsersBoolExp>;
  activeUsersAggregate?: InputMaybe<ActiveUsersAggregateBoolExp>;
  endTime?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  roomId?: InputMaybe<UuidComparisonExp>;
  startTime?: InputMaybe<TimestamptzComparisonExp>;
  status?: InputMaybe<StringComparisonExp>;
};

/** input type for inserting data into table "active_session" */
export type ActiveSessionInsertInput = {
  activeUsers?: InputMaybe<ActiveUsersArrRelInsertInput>;
  endTime?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  roomId?: InputMaybe<Scalars['uuid']['input']>;
  startTime?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type ActiveSessionMaxFields = {
  __typename?: 'ActiveSessionMaxFields';
  endTime?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  roomId?: Maybe<Scalars['uuid']['output']>;
  startTime?: Maybe<Scalars['timestamptz']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type ActiveSessionMinFields = {
  __typename?: 'ActiveSessionMinFields';
  endTime?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  roomId?: Maybe<Scalars['uuid']['output']>;
  startTime?: Maybe<Scalars['timestamptz']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "active_session" */
export type ActiveSessionMutationResponse = {
  __typename?: 'ActiveSessionMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<ActiveSession>;
};

/** input type for inserting object relation for remote table "active_session" */
export type ActiveSessionObjRelInsertInput = {
  data: ActiveSessionInsertInput;
};

/** Ordering options when selecting data from "active_session". */
export type ActiveSessionOrderBy = {
  activeUsersAggregate?: InputMaybe<ActiveUsersAggregateOrderBy>;
  endTime?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  roomId?: InputMaybe<OrderBy>;
  startTime?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
};

/** select columns of table "active_session" */
export enum ActiveSessionSelectColumn {
  /** column name */
  EndTime = 'endTime',
  /** column name */
  Id = 'id',
  /** column name */
  RoomId = 'roomId',
  /** column name */
  StartTime = 'startTime',
  /** column name */
  Status = 'status'
}

/** input type for updating data in table "active_session" */
export type ActiveSessionSetInput = {
  endTime?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  roomId?: InputMaybe<Scalars['uuid']['input']>;
  startTime?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "active_session" */
export type ActiveSessionStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: ActiveSessionStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type ActiveSessionStreamCursorValueInput = {
  endTime?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  roomId?: InputMaybe<Scalars['uuid']['input']>;
  startTime?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type ActiveSessionUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ActiveSessionSetInput>;
  /** filter the rows which have to be updated */
  where: ActiveSessionBoolExp;
};

/** columns and relationships of "active_users" */
export type ActiveUsers = {
  __typename?: 'ActiveUsers';
  endTime?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  roomId?: Maybe<Scalars['uuid']['output']>;
  sessionId?: Maybe<Scalars['uuid']['output']>;
  startTime?: Maybe<Scalars['timestamptz']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  user?: Maybe<Users>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "active_users" */
export type ActiveUsersAggregate = {
  __typename?: 'ActiveUsersAggregate';
  aggregate?: Maybe<ActiveUsersAggregateFields>;
  nodes: Array<ActiveUsers>;
};

export type ActiveUsersAggregateBoolExp = {
  count?: InputMaybe<ActiveUsersAggregateBoolExpCount>;
};

/** aggregate fields of "active_users" */
export type ActiveUsersAggregateFields = {
  __typename?: 'ActiveUsersAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<ActiveUsersMaxFields>;
  min?: Maybe<ActiveUsersMinFields>;
};


/** aggregate fields of "active_users" */
export type ActiveUsersAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<ActiveUsersSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "active_users" */
export type ActiveUsersAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<ActiveUsersMaxOrderBy>;
  min?: InputMaybe<ActiveUsersMinOrderBy>;
};

/** input type for inserting array relation for remote table "active_users" */
export type ActiveUsersArrRelInsertInput = {
  data: Array<ActiveUsersInsertInput>;
};

/** Boolean expression to filter rows from the table "active_users". All fields are combined with a logical 'AND'. */
export type ActiveUsersBoolExp = {
  _and?: InputMaybe<Array<ActiveUsersBoolExp>>;
  _not?: InputMaybe<ActiveUsersBoolExp>;
  _or?: InputMaybe<Array<ActiveUsersBoolExp>>;
  endTime?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  roomId?: InputMaybe<UuidComparisonExp>;
  sessionId?: InputMaybe<UuidComparisonExp>;
  startTime?: InputMaybe<TimestamptzComparisonExp>;
  status?: InputMaybe<StringComparisonExp>;
  user?: InputMaybe<UsersBoolExp>;
  userId?: InputMaybe<UuidComparisonExp>;
};

/** input type for inserting data into table "active_users" */
export type ActiveUsersInsertInput = {
  endTime?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  roomId?: InputMaybe<Scalars['uuid']['input']>;
  sessionId?: InputMaybe<Scalars['uuid']['input']>;
  startTime?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UsersObjRelInsertInput>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type ActiveUsersMaxFields = {
  __typename?: 'ActiveUsersMaxFields';
  endTime?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  roomId?: Maybe<Scalars['uuid']['output']>;
  sessionId?: Maybe<Scalars['uuid']['output']>;
  startTime?: Maybe<Scalars['timestamptz']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "active_users" */
export type ActiveUsersMaxOrderBy = {
  endTime?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  roomId?: InputMaybe<OrderBy>;
  sessionId?: InputMaybe<OrderBy>;
  startTime?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type ActiveUsersMinFields = {
  __typename?: 'ActiveUsersMinFields';
  endTime?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  roomId?: Maybe<Scalars['uuid']['output']>;
  sessionId?: Maybe<Scalars['uuid']['output']>;
  startTime?: Maybe<Scalars['timestamptz']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "active_users" */
export type ActiveUsersMinOrderBy = {
  endTime?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  roomId?: InputMaybe<OrderBy>;
  sessionId?: InputMaybe<OrderBy>;
  startTime?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "active_users" */
export type ActiveUsersMutationResponse = {
  __typename?: 'ActiveUsersMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<ActiveUsers>;
};

/** Ordering options when selecting data from "active_users". */
export type ActiveUsersOrderBy = {
  endTime?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  roomId?: InputMaybe<OrderBy>;
  sessionId?: InputMaybe<OrderBy>;
  startTime?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
  user?: InputMaybe<UsersOrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** select columns of table "active_users" */
export enum ActiveUsersSelectColumn {
  /** column name */
  EndTime = 'endTime',
  /** column name */
  Id = 'id',
  /** column name */
  RoomId = 'roomId',
  /** column name */
  SessionId = 'sessionId',
  /** column name */
  StartTime = 'startTime',
  /** column name */
  Status = 'status',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "active_users" */
export type ActiveUsersSetInput = {
  endTime?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  roomId?: InputMaybe<Scalars['uuid']['input']>;
  sessionId?: InputMaybe<Scalars['uuid']['input']>;
  startTime?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "active_users" */
export type ActiveUsersStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: ActiveUsersStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type ActiveUsersStreamCursorValueInput = {
  endTime?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  roomId?: InputMaybe<Scalars['uuid']['input']>;
  sessionId?: InputMaybe<Scalars['uuid']['input']>;
  startTime?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

export type ActiveUsersUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ActiveUsersSetInput>;
  /** filter the rows which have to be updated */
  where: ActiveUsersBoolExp;
};

/** ordering argument of a cursor */
export enum CursorOrdering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** column ordering options */
export enum OrderBy {
  /** in ascending order, nulls last */
  Asc = 'ASC',
  /** in ascending order, nulls first */
  AscNullsFirst = 'ASC_NULLS_FIRST',
  /** in ascending order, nulls last */
  AscNullsLast = 'ASC_NULLS_LAST',
  /** in descending order, nulls first */
  Desc = 'DESC',
  /** in descending order, nulls first */
  DescNullsFirst = 'DESC_NULLS_FIRST',
  /** in descending order, nulls last */
  DescNullsLast = 'DESC_NULLS_LAST'
}

/** columns and relationships of "rooms" */
export type Rooms = {
  __typename?: 'Rooms';
  /** An object relationship */
  activeSession?: Maybe<ActiveSession>;
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  /** An array relationship */
  sessions: Array<Sessions>;
  /** An aggregate relationship */
  sessionsAggregate: SessionsAggregate;
  status: Scalars['String']['output'];
};


/** columns and relationships of "rooms" */
export type RoomsSessionsArgs = {
  distinctOn?: InputMaybe<Array<SessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SessionsOrderBy>>;
  where?: InputMaybe<SessionsBoolExp>;
};


/** columns and relationships of "rooms" */
export type RoomsSessionsAggregateArgs = {
  distinctOn?: InputMaybe<Array<SessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SessionsOrderBy>>;
  where?: InputMaybe<SessionsBoolExp>;
};

/** aggregated selection of "rooms" */
export type RoomsAggregate = {
  __typename?: 'RoomsAggregate';
  aggregate?: Maybe<RoomsAggregateFields>;
  nodes: Array<Rooms>;
};

/** aggregate fields of "rooms" */
export type RoomsAggregateFields = {
  __typename?: 'RoomsAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<RoomsMaxFields>;
  min?: Maybe<RoomsMinFields>;
};


/** aggregate fields of "rooms" */
export type RoomsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<RoomsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "rooms". All fields are combined with a logical 'AND'. */
export type RoomsBoolExp = {
  _and?: InputMaybe<Array<RoomsBoolExp>>;
  _not?: InputMaybe<RoomsBoolExp>;
  _or?: InputMaybe<Array<RoomsBoolExp>>;
  activeSession?: InputMaybe<ActiveSessionBoolExp>;
  id?: InputMaybe<UuidComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  sessions?: InputMaybe<SessionsBoolExp>;
  sessionsAggregate?: InputMaybe<SessionsAggregateBoolExp>;
  status?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "rooms" */
export enum RoomsConstraint {
  /** unique or primary key constraint on columns "id" */
  RoomsPkey = 'rooms_pkey'
}

/** input type for inserting data into table "rooms" */
export type RoomsInsertInput = {
  activeSession?: InputMaybe<ActiveSessionObjRelInsertInput>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sessions?: InputMaybe<SessionsArrRelInsertInput>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type RoomsMaxFields = {
  __typename?: 'RoomsMaxFields';
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type RoomsMinFields = {
  __typename?: 'RoomsMinFields';
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "rooms" */
export type RoomsMutationResponse = {
  __typename?: 'RoomsMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Rooms>;
};

/** input type for inserting object relation for remote table "rooms" */
export type RoomsObjRelInsertInput = {
  data: RoomsInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<RoomsOnConflict>;
};

/** on_conflict condition type for table "rooms" */
export type RoomsOnConflict = {
  constraint: RoomsConstraint;
  updateColumns?: Array<RoomsUpdateColumn>;
  where?: InputMaybe<RoomsBoolExp>;
};

/** Ordering options when selecting data from "rooms". */
export type RoomsOrderBy = {
  activeSession?: InputMaybe<ActiveSessionOrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  sessionsAggregate?: InputMaybe<SessionsAggregateOrderBy>;
  status?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: rooms */
export type RoomsPkColumnsInput = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "rooms" */
export enum RoomsSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Status = 'status'
}

/** input type for updating data in table "rooms" */
export type RoomsSetInput = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "rooms" */
export type RoomsStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: RoomsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type RoomsStreamCursorValueInput = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "rooms" */
export enum RoomsUpdateColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Status = 'status'
}

export type RoomsUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<RoomsSetInput>;
  /** filter the rows which have to be updated */
  where: RoomsBoolExp;
};

/** columns and relationships of "sessions" */
export type Sessions = {
  __typename?: 'Sessions';
  endTime?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  /** An object relationship */
  room: Rooms;
  roomId: Scalars['uuid']['output'];
  startTime: Scalars['timestamptz']['output'];
  status: Scalars['String']['output'];
};

/** aggregated selection of "sessions" */
export type SessionsAggregate = {
  __typename?: 'SessionsAggregate';
  aggregate?: Maybe<SessionsAggregateFields>;
  nodes: Array<Sessions>;
};

export type SessionsAggregateBoolExp = {
  count?: InputMaybe<SessionsAggregateBoolExpCount>;
};

/** aggregate fields of "sessions" */
export type SessionsAggregateFields = {
  __typename?: 'SessionsAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<SessionsMaxFields>;
  min?: Maybe<SessionsMinFields>;
};


/** aggregate fields of "sessions" */
export type SessionsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<SessionsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "sessions" */
export type SessionsAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<SessionsMaxOrderBy>;
  min?: InputMaybe<SessionsMinOrderBy>;
};

/** input type for inserting array relation for remote table "sessions" */
export type SessionsArrRelInsertInput = {
  data: Array<SessionsInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<SessionsOnConflict>;
};

/** Boolean expression to filter rows from the table "sessions". All fields are combined with a logical 'AND'. */
export type SessionsBoolExp = {
  _and?: InputMaybe<Array<SessionsBoolExp>>;
  _not?: InputMaybe<SessionsBoolExp>;
  _or?: InputMaybe<Array<SessionsBoolExp>>;
  endTime?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  room?: InputMaybe<RoomsBoolExp>;
  roomId?: InputMaybe<UuidComparisonExp>;
  startTime?: InputMaybe<TimestamptzComparisonExp>;
  status?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "sessions" */
export enum SessionsConstraint {
  /** unique or primary key constraint on columns "id" */
  SessionsPkey = 'sessions_pkey'
}

/** input type for inserting data into table "sessions" */
export type SessionsInsertInput = {
  endTime?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  room?: InputMaybe<RoomsObjRelInsertInput>;
  roomId?: InputMaybe<Scalars['uuid']['input']>;
  startTime?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type SessionsMaxFields = {
  __typename?: 'SessionsMaxFields';
  endTime?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  roomId?: Maybe<Scalars['uuid']['output']>;
  startTime?: Maybe<Scalars['timestamptz']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "sessions" */
export type SessionsMaxOrderBy = {
  endTime?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  roomId?: InputMaybe<OrderBy>;
  startTime?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type SessionsMinFields = {
  __typename?: 'SessionsMinFields';
  endTime?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  roomId?: Maybe<Scalars['uuid']['output']>;
  startTime?: Maybe<Scalars['timestamptz']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "sessions" */
export type SessionsMinOrderBy = {
  endTime?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  roomId?: InputMaybe<OrderBy>;
  startTime?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "sessions" */
export type SessionsMutationResponse = {
  __typename?: 'SessionsMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Sessions>;
};

/** on_conflict condition type for table "sessions" */
export type SessionsOnConflict = {
  constraint: SessionsConstraint;
  updateColumns?: Array<SessionsUpdateColumn>;
  where?: InputMaybe<SessionsBoolExp>;
};

/** Ordering options when selecting data from "sessions". */
export type SessionsOrderBy = {
  endTime?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  room?: InputMaybe<RoomsOrderBy>;
  roomId?: InputMaybe<OrderBy>;
  startTime?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: sessions */
export type SessionsPkColumnsInput = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "sessions" */
export enum SessionsSelectColumn {
  /** column name */
  EndTime = 'endTime',
  /** column name */
  Id = 'id',
  /** column name */
  RoomId = 'roomId',
  /** column name */
  StartTime = 'startTime',
  /** column name */
  Status = 'status'
}

/** input type for updating data in table "sessions" */
export type SessionsSetInput = {
  endTime?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  roomId?: InputMaybe<Scalars['uuid']['input']>;
  startTime?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "sessions" */
export type SessionsStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: SessionsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SessionsStreamCursorValueInput = {
  endTime?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  roomId?: InputMaybe<Scalars['uuid']['input']>;
  startTime?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "sessions" */
export enum SessionsUpdateColumn {
  /** column name */
  EndTime = 'endTime',
  /** column name */
  Id = 'id',
  /** column name */
  RoomId = 'roomId',
  /** column name */
  StartTime = 'startTime',
  /** column name */
  Status = 'status'
}

export type SessionsUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<SessionsSetInput>;
  /** filter the rows which have to be updated */
  where: SessionsBoolExp;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "user_sessions" */
export type UserSessions = {
  __typename?: 'UserSessions';
  endTime?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  roomId: Scalars['uuid']['output'];
  sessionId: Scalars['uuid']['output'];
  startTime: Scalars['timestamptz']['output'];
  status: Scalars['String']['output'];
  userId: Scalars['uuid']['output'];
};

/** aggregated selection of "user_sessions" */
export type UserSessionsAggregate = {
  __typename?: 'UserSessionsAggregate';
  aggregate?: Maybe<UserSessionsAggregateFields>;
  nodes: Array<UserSessions>;
};

/** aggregate fields of "user_sessions" */
export type UserSessionsAggregateFields = {
  __typename?: 'UserSessionsAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<UserSessionsMaxFields>;
  min?: Maybe<UserSessionsMinFields>;
};


/** aggregate fields of "user_sessions" */
export type UserSessionsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<UserSessionsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "user_sessions". All fields are combined with a logical 'AND'. */
export type UserSessionsBoolExp = {
  _and?: InputMaybe<Array<UserSessionsBoolExp>>;
  _not?: InputMaybe<UserSessionsBoolExp>;
  _or?: InputMaybe<Array<UserSessionsBoolExp>>;
  endTime?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  roomId?: InputMaybe<UuidComparisonExp>;
  sessionId?: InputMaybe<UuidComparisonExp>;
  startTime?: InputMaybe<TimestamptzComparisonExp>;
  status?: InputMaybe<StringComparisonExp>;
  userId?: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "user_sessions" */
export enum UserSessionsConstraint {
  /** unique or primary key constraint on columns "id" */
  UserSessionsPkey = 'user_sessions_pkey'
}

/** input type for inserting data into table "user_sessions" */
export type UserSessionsInsertInput = {
  endTime?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  roomId?: InputMaybe<Scalars['uuid']['input']>;
  sessionId?: InputMaybe<Scalars['uuid']['input']>;
  startTime?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type UserSessionsMaxFields = {
  __typename?: 'UserSessionsMaxFields';
  endTime?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  roomId?: Maybe<Scalars['uuid']['output']>;
  sessionId?: Maybe<Scalars['uuid']['output']>;
  startTime?: Maybe<Scalars['timestamptz']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type UserSessionsMinFields = {
  __typename?: 'UserSessionsMinFields';
  endTime?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  roomId?: Maybe<Scalars['uuid']['output']>;
  sessionId?: Maybe<Scalars['uuid']['output']>;
  startTime?: Maybe<Scalars['timestamptz']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "user_sessions" */
export type UserSessionsMutationResponse = {
  __typename?: 'UserSessionsMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<UserSessions>;
};

/** on_conflict condition type for table "user_sessions" */
export type UserSessionsOnConflict = {
  constraint: UserSessionsConstraint;
  updateColumns?: Array<UserSessionsUpdateColumn>;
  where?: InputMaybe<UserSessionsBoolExp>;
};

/** Ordering options when selecting data from "user_sessions". */
export type UserSessionsOrderBy = {
  endTime?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  roomId?: InputMaybe<OrderBy>;
  sessionId?: InputMaybe<OrderBy>;
  startTime?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: user_sessions */
export type UserSessionsPkColumnsInput = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "user_sessions" */
export enum UserSessionsSelectColumn {
  /** column name */
  EndTime = 'endTime',
  /** column name */
  Id = 'id',
  /** column name */
  RoomId = 'roomId',
  /** column name */
  SessionId = 'sessionId',
  /** column name */
  StartTime = 'startTime',
  /** column name */
  Status = 'status',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "user_sessions" */
export type UserSessionsSetInput = {
  endTime?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  roomId?: InputMaybe<Scalars['uuid']['input']>;
  sessionId?: InputMaybe<Scalars['uuid']['input']>;
  startTime?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "user_sessions" */
export type UserSessionsStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: UserSessionsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type UserSessionsStreamCursorValueInput = {
  endTime?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  roomId?: InputMaybe<Scalars['uuid']['input']>;
  sessionId?: InputMaybe<Scalars['uuid']['input']>;
  startTime?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "user_sessions" */
export enum UserSessionsUpdateColumn {
  /** column name */
  EndTime = 'endTime',
  /** column name */
  Id = 'id',
  /** column name */
  RoomId = 'roomId',
  /** column name */
  SessionId = 'sessionId',
  /** column name */
  StartTime = 'startTime',
  /** column name */
  Status = 'status',
  /** column name */
  UserId = 'userId'
}

export type UserSessionsUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<UserSessionsSetInput>;
  /** filter the rows which have to be updated */
  where: UserSessionsBoolExp;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'Users';
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  role: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

/** aggregated selection of "users" */
export type UsersAggregate = {
  __typename?: 'UsersAggregate';
  aggregate?: Maybe<UsersAggregateFields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type UsersAggregateFields = {
  __typename?: 'UsersAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<UsersMaxFields>;
  min?: Maybe<UsersMinFields>;
};


/** aggregate fields of "users" */
export type UsersAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<UsersSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type UsersBoolExp = {
  _and?: InputMaybe<Array<UsersBoolExp>>;
  _not?: InputMaybe<UsersBoolExp>;
  _or?: InputMaybe<Array<UsersBoolExp>>;
  id?: InputMaybe<UuidComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  role?: InputMaybe<StringComparisonExp>;
  status?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "users" */
export enum UsersConstraint {
  /** unique or primary key constraint on columns "id" */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type UsersInsertInput = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type UsersMaxFields = {
  __typename?: 'UsersMaxFields';
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type UsersMinFields = {
  __typename?: 'UsersMinFields';
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "users" */
export type UsersMutationResponse = {
  __typename?: 'UsersMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type UsersObjRelInsertInput = {
  data: UsersInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<UsersOnConflict>;
};

/** on_conflict condition type for table "users" */
export type UsersOnConflict = {
  constraint: UsersConstraint;
  updateColumns?: Array<UsersUpdateColumn>;
  where?: InputMaybe<UsersBoolExp>;
};

/** Ordering options when selecting data from "users". */
export type UsersOrderBy = {
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  role?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: users */
export type UsersPkColumnsInput = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "users" */
export enum UsersSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Role = 'role',
  /** column name */
  Status = 'status'
}

/** input type for updating data in table "users" */
export type UsersSetInput = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "users" */
export type UsersStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: UsersStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type UsersStreamCursorValueInput = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "users" */
export enum UsersUpdateColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Role = 'role',
  /** column name */
  Status = 'status'
}

export type UsersUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<UsersSetInput>;
  /** filter the rows which have to be updated */
  where: UsersBoolExp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type UuidComparisonExp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

export type ActiveUsersAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<ActiveUsersSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ActiveUsersBoolExp>;
  predicate: IntComparisonExp;
};

/** mutation root */
export type MutationRoot = {
  __typename?: 'mutation_root';
  /** delete data from the table: "active_session" */
  deleteActiveSession?: Maybe<ActiveSessionMutationResponse>;
  /** delete data from the table: "active_users" */
  deleteActiveUsers?: Maybe<ActiveUsersMutationResponse>;
  /** delete data from the table: "rooms" */
  deleteRooms?: Maybe<RoomsMutationResponse>;
  /** delete single row from the table: "rooms" */
  deleteRoomsByPk?: Maybe<Rooms>;
  /** delete data from the table: "sessions" */
  deleteSessions?: Maybe<SessionsMutationResponse>;
  /** delete single row from the table: "sessions" */
  deleteSessionsByPk?: Maybe<Sessions>;
  /** delete data from the table: "user_sessions" */
  deleteUserSessions?: Maybe<UserSessionsMutationResponse>;
  /** delete single row from the table: "user_sessions" */
  deleteUserSessionsByPk?: Maybe<UserSessions>;
  /** delete data from the table: "users" */
  deleteUsers?: Maybe<UsersMutationResponse>;
  /** delete single row from the table: "users" */
  deleteUsersByPk?: Maybe<Users>;
  /** insert data into the table: "active_session" */
  insertActiveSession?: Maybe<ActiveSessionMutationResponse>;
  /** insert a single row into the table: "active_session" */
  insertActiveSessionOne?: Maybe<ActiveSession>;
  /** insert data into the table: "active_users" */
  insertActiveUsers?: Maybe<ActiveUsersMutationResponse>;
  /** insert a single row into the table: "active_users" */
  insertActiveUsersOne?: Maybe<ActiveUsers>;
  /** insert data into the table: "rooms" */
  insertRooms?: Maybe<RoomsMutationResponse>;
  /** insert a single row into the table: "rooms" */
  insertRoomsOne?: Maybe<Rooms>;
  /** insert data into the table: "sessions" */
  insertSessions?: Maybe<SessionsMutationResponse>;
  /** insert a single row into the table: "sessions" */
  insertSessionsOne?: Maybe<Sessions>;
  /** insert data into the table: "user_sessions" */
  insertUserSessions?: Maybe<UserSessionsMutationResponse>;
  /** insert a single row into the table: "user_sessions" */
  insertUserSessionsOne?: Maybe<UserSessions>;
  /** insert data into the table: "users" */
  insertUsers?: Maybe<UsersMutationResponse>;
  /** insert a single row into the table: "users" */
  insertUsersOne?: Maybe<Users>;
  /** update data of the table: "active_session" */
  updateActiveSession?: Maybe<ActiveSessionMutationResponse>;
  /** update multiples rows of table: "active_session" */
  updateActiveSessionMany?: Maybe<Array<Maybe<ActiveSessionMutationResponse>>>;
  /** update data of the table: "active_users" */
  updateActiveUsers?: Maybe<ActiveUsersMutationResponse>;
  /** update multiples rows of table: "active_users" */
  updateActiveUsersMany?: Maybe<Array<Maybe<ActiveUsersMutationResponse>>>;
  /** update data of the table: "rooms" */
  updateRooms?: Maybe<RoomsMutationResponse>;
  /** update single row of the table: "rooms" */
  updateRoomsByPk?: Maybe<Rooms>;
  /** update multiples rows of table: "rooms" */
  updateRoomsMany?: Maybe<Array<Maybe<RoomsMutationResponse>>>;
  /** update data of the table: "sessions" */
  updateSessions?: Maybe<SessionsMutationResponse>;
  /** update single row of the table: "sessions" */
  updateSessionsByPk?: Maybe<Sessions>;
  /** update multiples rows of table: "sessions" */
  updateSessionsMany?: Maybe<Array<Maybe<SessionsMutationResponse>>>;
  /** update data of the table: "user_sessions" */
  updateUserSessions?: Maybe<UserSessionsMutationResponse>;
  /** update single row of the table: "user_sessions" */
  updateUserSessionsByPk?: Maybe<UserSessions>;
  /** update multiples rows of table: "user_sessions" */
  updateUserSessionsMany?: Maybe<Array<Maybe<UserSessionsMutationResponse>>>;
  /** update data of the table: "users" */
  updateUsers?: Maybe<UsersMutationResponse>;
  /** update single row of the table: "users" */
  updateUsersByPk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  updateUsersMany?: Maybe<Array<Maybe<UsersMutationResponse>>>;
};


/** mutation root */
export type MutationRootDeleteActiveSessionArgs = {
  where: ActiveSessionBoolExp;
};


/** mutation root */
export type MutationRootDeleteActiveUsersArgs = {
  where: ActiveUsersBoolExp;
};


/** mutation root */
export type MutationRootDeleteRoomsArgs = {
  where: RoomsBoolExp;
};


/** mutation root */
export type MutationRootDeleteRoomsByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type MutationRootDeleteSessionsArgs = {
  where: SessionsBoolExp;
};


/** mutation root */
export type MutationRootDeleteSessionsByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type MutationRootDeleteUserSessionsArgs = {
  where: UserSessionsBoolExp;
};


/** mutation root */
export type MutationRootDeleteUserSessionsByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type MutationRootDeleteUsersArgs = {
  where: UsersBoolExp;
};


/** mutation root */
export type MutationRootDeleteUsersByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type MutationRootInsertActiveSessionArgs = {
  objects: Array<ActiveSessionInsertInput>;
};


/** mutation root */
export type MutationRootInsertActiveSessionOneArgs = {
  object: ActiveSessionInsertInput;
};


/** mutation root */
export type MutationRootInsertActiveUsersArgs = {
  objects: Array<ActiveUsersInsertInput>;
};


/** mutation root */
export type MutationRootInsertActiveUsersOneArgs = {
  object: ActiveUsersInsertInput;
};


/** mutation root */
export type MutationRootInsertRoomsArgs = {
  objects: Array<RoomsInsertInput>;
  onConflict?: InputMaybe<RoomsOnConflict>;
};


/** mutation root */
export type MutationRootInsertRoomsOneArgs = {
  object: RoomsInsertInput;
  onConflict?: InputMaybe<RoomsOnConflict>;
};


/** mutation root */
export type MutationRootInsertSessionsArgs = {
  objects: Array<SessionsInsertInput>;
  onConflict?: InputMaybe<SessionsOnConflict>;
};


/** mutation root */
export type MutationRootInsertSessionsOneArgs = {
  object: SessionsInsertInput;
  onConflict?: InputMaybe<SessionsOnConflict>;
};


/** mutation root */
export type MutationRootInsertUserSessionsArgs = {
  objects: Array<UserSessionsInsertInput>;
  onConflict?: InputMaybe<UserSessionsOnConflict>;
};


/** mutation root */
export type MutationRootInsertUserSessionsOneArgs = {
  object: UserSessionsInsertInput;
  onConflict?: InputMaybe<UserSessionsOnConflict>;
};


/** mutation root */
export type MutationRootInsertUsersArgs = {
  objects: Array<UsersInsertInput>;
  onConflict?: InputMaybe<UsersOnConflict>;
};


/** mutation root */
export type MutationRootInsertUsersOneArgs = {
  object: UsersInsertInput;
  onConflict?: InputMaybe<UsersOnConflict>;
};


/** mutation root */
export type MutationRootUpdateActiveSessionArgs = {
  _set?: InputMaybe<ActiveSessionSetInput>;
  where: ActiveSessionBoolExp;
};


/** mutation root */
export type MutationRootUpdateActiveSessionManyArgs = {
  updates: Array<ActiveSessionUpdates>;
};


/** mutation root */
export type MutationRootUpdateActiveUsersArgs = {
  _set?: InputMaybe<ActiveUsersSetInput>;
  where: ActiveUsersBoolExp;
};


/** mutation root */
export type MutationRootUpdateActiveUsersManyArgs = {
  updates: Array<ActiveUsersUpdates>;
};


/** mutation root */
export type MutationRootUpdateRoomsArgs = {
  _set?: InputMaybe<RoomsSetInput>;
  where: RoomsBoolExp;
};


/** mutation root */
export type MutationRootUpdateRoomsByPkArgs = {
  _set?: InputMaybe<RoomsSetInput>;
  pkColumns: RoomsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateRoomsManyArgs = {
  updates: Array<RoomsUpdates>;
};


/** mutation root */
export type MutationRootUpdateSessionsArgs = {
  _set?: InputMaybe<SessionsSetInput>;
  where: SessionsBoolExp;
};


/** mutation root */
export type MutationRootUpdateSessionsByPkArgs = {
  _set?: InputMaybe<SessionsSetInput>;
  pkColumns: SessionsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateSessionsManyArgs = {
  updates: Array<SessionsUpdates>;
};


/** mutation root */
export type MutationRootUpdateUserSessionsArgs = {
  _set?: InputMaybe<UserSessionsSetInput>;
  where: UserSessionsBoolExp;
};


/** mutation root */
export type MutationRootUpdateUserSessionsByPkArgs = {
  _set?: InputMaybe<UserSessionsSetInput>;
  pkColumns: UserSessionsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateUserSessionsManyArgs = {
  updates: Array<UserSessionsUpdates>;
};


/** mutation root */
export type MutationRootUpdateUsersArgs = {
  _set?: InputMaybe<UsersSetInput>;
  where: UsersBoolExp;
};


/** mutation root */
export type MutationRootUpdateUsersByPkArgs = {
  _set?: InputMaybe<UsersSetInput>;
  pkColumns: UsersPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateUsersManyArgs = {
  updates: Array<UsersUpdates>;
};

export type QueryRoot = {
  __typename?: 'query_root';
  /** fetch data from the table: "active_session" */
  activeSession: Array<ActiveSession>;
  /** fetch aggregated fields from the table: "active_session" */
  activeSessionAggregate: ActiveSessionAggregate;
  /** An array relationship */
  activeUsers: Array<ActiveUsers>;
  /** An aggregate relationship */
  activeUsersAggregate: ActiveUsersAggregate;
  /** fetch data from the table: "rooms" */
  rooms: Array<Rooms>;
  /** fetch aggregated fields from the table: "rooms" */
  roomsAggregate: RoomsAggregate;
  /** fetch data from the table: "rooms" using primary key columns */
  roomsByPk?: Maybe<Rooms>;
  /** An array relationship */
  sessions: Array<Sessions>;
  /** An aggregate relationship */
  sessionsAggregate: SessionsAggregate;
  /** fetch data from the table: "sessions" using primary key columns */
  sessionsByPk?: Maybe<Sessions>;
  /** fetch data from the table: "user_sessions" */
  userSessions: Array<UserSessions>;
  /** fetch aggregated fields from the table: "user_sessions" */
  userSessionsAggregate: UserSessionsAggregate;
  /** fetch data from the table: "user_sessions" using primary key columns */
  userSessionsByPk?: Maybe<UserSessions>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  usersAggregate: UsersAggregate;
  /** fetch data from the table: "users" using primary key columns */
  usersByPk?: Maybe<Users>;
};


export type QueryRootActiveSessionArgs = {
  distinctOn?: InputMaybe<Array<ActiveSessionSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ActiveSessionOrderBy>>;
  where?: InputMaybe<ActiveSessionBoolExp>;
};


export type QueryRootActiveSessionAggregateArgs = {
  distinctOn?: InputMaybe<Array<ActiveSessionSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ActiveSessionOrderBy>>;
  where?: InputMaybe<ActiveSessionBoolExp>;
};


export type QueryRootActiveUsersArgs = {
  distinctOn?: InputMaybe<Array<ActiveUsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ActiveUsersOrderBy>>;
  where?: InputMaybe<ActiveUsersBoolExp>;
};


export type QueryRootActiveUsersAggregateArgs = {
  distinctOn?: InputMaybe<Array<ActiveUsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ActiveUsersOrderBy>>;
  where?: InputMaybe<ActiveUsersBoolExp>;
};


export type QueryRootRoomsArgs = {
  distinctOn?: InputMaybe<Array<RoomsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RoomsOrderBy>>;
  where?: InputMaybe<RoomsBoolExp>;
};


export type QueryRootRoomsAggregateArgs = {
  distinctOn?: InputMaybe<Array<RoomsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RoomsOrderBy>>;
  where?: InputMaybe<RoomsBoolExp>;
};


export type QueryRootRoomsByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type QueryRootSessionsArgs = {
  distinctOn?: InputMaybe<Array<SessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SessionsOrderBy>>;
  where?: InputMaybe<SessionsBoolExp>;
};


export type QueryRootSessionsAggregateArgs = {
  distinctOn?: InputMaybe<Array<SessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SessionsOrderBy>>;
  where?: InputMaybe<SessionsBoolExp>;
};


export type QueryRootSessionsByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type QueryRootUserSessionsArgs = {
  distinctOn?: InputMaybe<Array<UserSessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserSessionsOrderBy>>;
  where?: InputMaybe<UserSessionsBoolExp>;
};


export type QueryRootUserSessionsAggregateArgs = {
  distinctOn?: InputMaybe<Array<UserSessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserSessionsOrderBy>>;
  where?: InputMaybe<UserSessionsBoolExp>;
};


export type QueryRootUserSessionsByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type QueryRootUsersArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type QueryRootUsersAggregateArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type QueryRootUsersByPkArgs = {
  id: Scalars['uuid']['input'];
};

export type SessionsAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<SessionsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<SessionsBoolExp>;
  predicate: IntComparisonExp;
};

export type SubscriptionRoot = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "active_session" */
  activeSession: Array<ActiveSession>;
  /** fetch aggregated fields from the table: "active_session" */
  activeSessionAggregate: ActiveSessionAggregate;
  /** fetch data from the table in a streaming manner: "active_session" */
  activeSessionStream: Array<ActiveSession>;
  /** An array relationship */
  activeUsers: Array<ActiveUsers>;
  /** An aggregate relationship */
  activeUsersAggregate: ActiveUsersAggregate;
  /** fetch data from the table in a streaming manner: "active_users" */
  activeUsersStream: Array<ActiveUsers>;
  /** fetch data from the table: "rooms" */
  rooms: Array<Rooms>;
  /** fetch aggregated fields from the table: "rooms" */
  roomsAggregate: RoomsAggregate;
  /** fetch data from the table: "rooms" using primary key columns */
  roomsByPk?: Maybe<Rooms>;
  /** fetch data from the table in a streaming manner: "rooms" */
  roomsStream: Array<Rooms>;
  /** An array relationship */
  sessions: Array<Sessions>;
  /** An aggregate relationship */
  sessionsAggregate: SessionsAggregate;
  /** fetch data from the table: "sessions" using primary key columns */
  sessionsByPk?: Maybe<Sessions>;
  /** fetch data from the table in a streaming manner: "sessions" */
  sessionsStream: Array<Sessions>;
  /** fetch data from the table: "user_sessions" */
  userSessions: Array<UserSessions>;
  /** fetch aggregated fields from the table: "user_sessions" */
  userSessionsAggregate: UserSessionsAggregate;
  /** fetch data from the table: "user_sessions" using primary key columns */
  userSessionsByPk?: Maybe<UserSessions>;
  /** fetch data from the table in a streaming manner: "user_sessions" */
  userSessionsStream: Array<UserSessions>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  usersAggregate: UsersAggregate;
  /** fetch data from the table: "users" using primary key columns */
  usersByPk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  usersStream: Array<Users>;
};


export type SubscriptionRootActiveSessionArgs = {
  distinctOn?: InputMaybe<Array<ActiveSessionSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ActiveSessionOrderBy>>;
  where?: InputMaybe<ActiveSessionBoolExp>;
};


export type SubscriptionRootActiveSessionAggregateArgs = {
  distinctOn?: InputMaybe<Array<ActiveSessionSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ActiveSessionOrderBy>>;
  where?: InputMaybe<ActiveSessionBoolExp>;
};


export type SubscriptionRootActiveSessionStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ActiveSessionStreamCursorInput>>;
  where?: InputMaybe<ActiveSessionBoolExp>;
};


export type SubscriptionRootActiveUsersArgs = {
  distinctOn?: InputMaybe<Array<ActiveUsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ActiveUsersOrderBy>>;
  where?: InputMaybe<ActiveUsersBoolExp>;
};


export type SubscriptionRootActiveUsersAggregateArgs = {
  distinctOn?: InputMaybe<Array<ActiveUsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ActiveUsersOrderBy>>;
  where?: InputMaybe<ActiveUsersBoolExp>;
};


export type SubscriptionRootActiveUsersStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ActiveUsersStreamCursorInput>>;
  where?: InputMaybe<ActiveUsersBoolExp>;
};


export type SubscriptionRootRoomsArgs = {
  distinctOn?: InputMaybe<Array<RoomsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RoomsOrderBy>>;
  where?: InputMaybe<RoomsBoolExp>;
};


export type SubscriptionRootRoomsAggregateArgs = {
  distinctOn?: InputMaybe<Array<RoomsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RoomsOrderBy>>;
  where?: InputMaybe<RoomsBoolExp>;
};


export type SubscriptionRootRoomsByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type SubscriptionRootRoomsStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<RoomsStreamCursorInput>>;
  where?: InputMaybe<RoomsBoolExp>;
};


export type SubscriptionRootSessionsArgs = {
  distinctOn?: InputMaybe<Array<SessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SessionsOrderBy>>;
  where?: InputMaybe<SessionsBoolExp>;
};


export type SubscriptionRootSessionsAggregateArgs = {
  distinctOn?: InputMaybe<Array<SessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SessionsOrderBy>>;
  where?: InputMaybe<SessionsBoolExp>;
};


export type SubscriptionRootSessionsByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type SubscriptionRootSessionsStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<SessionsStreamCursorInput>>;
  where?: InputMaybe<SessionsBoolExp>;
};


export type SubscriptionRootUserSessionsArgs = {
  distinctOn?: InputMaybe<Array<UserSessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserSessionsOrderBy>>;
  where?: InputMaybe<UserSessionsBoolExp>;
};


export type SubscriptionRootUserSessionsAggregateArgs = {
  distinctOn?: InputMaybe<Array<UserSessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserSessionsOrderBy>>;
  where?: InputMaybe<UserSessionsBoolExp>;
};


export type SubscriptionRootUserSessionsByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type SubscriptionRootUserSessionsStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<UserSessionsStreamCursorInput>>;
  where?: InputMaybe<UserSessionsBoolExp>;
};


export type SubscriptionRootUsersArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type SubscriptionRootUsersAggregateArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type SubscriptionRootUsersByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type SubscriptionRootUsersStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<UsersStreamCursorInput>>;
  where?: InputMaybe<UsersBoolExp>;
};

export type RoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type RoomsQuery = { __typename?: 'query_root', rooms: Array<(
    { __typename?: 'Rooms' }
    & { ' $fragmentRefs'?: { 'RoomsListFragment': RoomsListFragment } }
  )> };

export type RoomFragment = { __typename?: 'Rooms', id: string, name: string, status: string, activeSession?: { __typename?: 'ActiveSession', id?: string | null, startTime?: string | null, endTime?: string | null, activeUsers: Array<{ __typename?: 'ActiveUsers', id?: string | null, user?: { __typename?: 'Users', name: string } | null }> } | null } & { ' $fragmentName'?: 'RoomFragment' };

export type EndSessionMutationVariables = Exact<{
  roomId?: InputMaybe<Scalars['uuid']['input']>;
  roomStatus?: InputMaybe<Scalars['String']['input']>;
  sessionId?: InputMaybe<Scalars['uuid']['input']>;
  sessionStatus?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['timestamptz']['input']>;
  userSessionIds?: InputMaybe<Array<Scalars['uuid']['input']> | Scalars['uuid']['input']>;
  userSessionStatus?: InputMaybe<Scalars['String']['input']>;
}>;


export type EndSessionMutation = { __typename?: 'mutation_root', updateRoomsByPk?: { __typename?: 'Rooms', id: string } | null, updateSessionsByPk?: { __typename?: 'Sessions', id: string } | null, updateUserSessionsMany?: Array<{ __typename?: 'UserSessionsMutationResponse', returning: Array<{ __typename?: 'UserSessions', id: string }> } | null> | null };

export type RoomsListFragment = (
  { __typename?: 'Rooms', id: string }
  & { ' $fragmentRefs'?: { 'RoomFragment': RoomFragment } }
) & { ' $fragmentName'?: 'RoomsListFragment' };

export const RoomFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Room"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Rooms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"activeSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"activeUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RoomFragment, unknown>;
export const RoomsListFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RoomsList"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Rooms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Room"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Room"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Rooms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"activeSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"activeUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RoomsListFragment, unknown>;
export const RoomsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Rooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RoomsList"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Room"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Rooms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"activeSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"activeUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RoomsList"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Rooms"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Room"}}]}}]} as unknown as DocumentNode<RoomsQuery, RoomsQueryVariables>;
export const EndSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EndSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomStatus"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionStatus"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"timestamptz"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userSessionIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userSessionStatus"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRoomsByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkColumns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomStatus"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updateSessionsByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkColumns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionStatus"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"endTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updateUserSessionsMany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updates"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userSessionIds"}}}]}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userSessionStatus"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"endTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<EndSessionMutation, EndSessionMutationVariables>;