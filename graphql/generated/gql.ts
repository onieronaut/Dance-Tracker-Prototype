/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n\tfragment QueueSlot on Rotation {\n\t\tid\n\t\tindex\n\t\ttype\n\t\tname\n\t\tcurrentUserRotation {\n\t\t\tid\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\tactiveSession {\n\t\t\t\t\tid\n\t\t\t\t\tstartTime\n\t\t\t\t\tendTime\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.QueueSlotFragmentDoc,
    "\n\tfragment Room on Rooms {\n\t\tid\n\t\tname\n\t\tstatus\n\t\tactiveSession {\n\t\t\tid\n\t\t\tstartTime\n\t\t\tendTime\n\t\t\tactiveUsers {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.RoomFragmentDoc,
    "\n\tfragment RoomsList on Rooms {\n\t\tid\n\t\t...Room\n\t}\n": typeof types.RoomsListFragmentDoc,
    "\n\tmutation EndSession(\n\t\t$roomId: uuid = \"\"\n\t\t$sessionId: uuid = \"\"\n\t\t$endTime: timestamptz = \"\"\n\t\t$userSessionIds: [uuid!] = \"\"\n\t\t$userIds: [uuid!] = \"\"\n\t) {\n\t\tupdateRoomsByPk(pkColumns: { id: $roomId }, _set: { status: \"Open\" }) {\n\t\t\tid\n\t\t}\n\t\tupdateSessionsByPk(\n\t\t\tpkColumns: { id: $sessionId }\n\t\t\t_set: { status: \"Complete\", endTime: $endTime }\n\t\t) {\n\t\t\tid\n\t\t}\n\t\tupdateUserSessionsMany(\n\t\t\tupdates: {\n\t\t\t\twhere: { id: { _in: $userSessionIds } }\n\t\t\t\t_set: { status: \"Complete\", endTime: $endTime }\n\t\t\t}\n\t\t) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t\tupdateUsersMany(\n\t\t\tupdates: { where: { id: { _in: $userIds } }, _set: { status: \"Active\" } }\n\t\t) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n": typeof types.EndSessionDocument,
    "\n\tmutation StartSession(\n\t\t$roomId: uuid = \"\"\n\t\t$data: [UserSessionsInsertInput!] = {}\n\t\t$userIds: [uuid!] = \"\"\n\t) {\n\t\tinsertSessionsOne(\n\t\t\tobject: { roomId: $roomId, userSessions: { data: $data } }\n\t\t) {\n\t\t\tid\n\t\t}\n\t\tupdateRoomsByPk(pkColumns: { id: $roomId }, _set: { status: \"In Use\" }) {\n\t\t\tid\n\t\t}\n\t\tupdateUsersMany(\n\t\t\tupdates: { where: { id: { _in: $userIds } }, _set: { status: \"In Room\" } }\n\t\t) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n": typeof types.StartSessionDocument,
    "\n\tmutation UpdateQueueRotation(\n\t\t$endTime: timestamptz = \"\"\n\t\t$updateUserRotation: [uuid!] = \"\"\n\t\t$updateRotationMany: [RotationUpdates!] = {\n\t\t\twhere: { id: { _eq: \"\" } }\n\t\t\t_set: { userId: \"\" }\n\t\t}\n\t\t$insertUserRotation: [UserRotationInsertInput!] = {\n\t\t\trotationId: \"\"\n\t\t\tuserId: \"\"\n\t\t}\n\t) {\n\t\tupdateRotationMany(updates: $updateRotationMany) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tindex\n\t\t\t\ttype\n\t\t\t\tname\n\t\t\t\tcurrentUserRotation {\n\t\t\t\t\tid\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tactiveSession {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tstartTime\n\t\t\t\t\t\t\tendTime\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tupdateUserRotation(\n\t\t\twhere: { id: { _in: $updateUserRotation } }\n\t\t\t_set: { endTime: $endTime }\n\t\t) {\n\t\t\taffectedRows\n\t\t}\n\t\tinsertUserRotation(objects: $insertUserRotation) {\n\t\t\taffectedRows\n\t\t}\n\t}\n": typeof types.UpdateQueueRotationDocument,
    "\n\tquery ActiveDancers {\n\t\tusers(\n\t\t\torderBy: { name: ASC }\n\t\t\twhere: { role: { _eq: \"dancer\" }, status: { _eq: \"Active\" } }\n\t\t) {\n\t\t\tid\n\t\t\tname\n\t\t\tstatus\n\t\t}\n\t}\n": typeof types.ActiveDancersDocument,
    "\n\tquery QueueRotation {\n\t\trotation(orderBy: { index: ASC }, where: { type: { _eq: \"queue\" } }) {\n\t\t\tid\n\t\t\tindex\n\t\t\ttype\n\t\t\tname\n\t\t\tcurrentUserRotation {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tstatus\n\t\t\t\t\tactiveSession {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tstartTime\n\t\t\t\t\t\tendTime\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.QueueRotationDocument,
    "\n\tquery StageRotation {\n\t\trotation(orderBy: { index: ASC }, where: { type: { _eq: \"stage\" } }) {\n\t\t\tid\n\t\t\tindex\n\t\t\ttype\n\t\t\tname\n\t\t\tcurrentUserRotation {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.StageRotationDocument,
    "\n\tsubscription Rooms {\n\t\trooms(orderBy: { name: ASC }) {\n\t\t\tid\n\t\t\t...RoomsList\n\t\t\t...Room\n\t\t}\n\t}\n": typeof types.RoomsDocument,
};
const documents: Documents = {
    "\n\tfragment QueueSlot on Rotation {\n\t\tid\n\t\tindex\n\t\ttype\n\t\tname\n\t\tcurrentUserRotation {\n\t\t\tid\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\tactiveSession {\n\t\t\t\t\tid\n\t\t\t\t\tstartTime\n\t\t\t\t\tendTime\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.QueueSlotFragmentDoc,
    "\n\tfragment Room on Rooms {\n\t\tid\n\t\tname\n\t\tstatus\n\t\tactiveSession {\n\t\t\tid\n\t\t\tstartTime\n\t\t\tendTime\n\t\t\tactiveUsers {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.RoomFragmentDoc,
    "\n\tfragment RoomsList on Rooms {\n\t\tid\n\t\t...Room\n\t}\n": types.RoomsListFragmentDoc,
    "\n\tmutation EndSession(\n\t\t$roomId: uuid = \"\"\n\t\t$sessionId: uuid = \"\"\n\t\t$endTime: timestamptz = \"\"\n\t\t$userSessionIds: [uuid!] = \"\"\n\t\t$userIds: [uuid!] = \"\"\n\t) {\n\t\tupdateRoomsByPk(pkColumns: { id: $roomId }, _set: { status: \"Open\" }) {\n\t\t\tid\n\t\t}\n\t\tupdateSessionsByPk(\n\t\t\tpkColumns: { id: $sessionId }\n\t\t\t_set: { status: \"Complete\", endTime: $endTime }\n\t\t) {\n\t\t\tid\n\t\t}\n\t\tupdateUserSessionsMany(\n\t\t\tupdates: {\n\t\t\t\twhere: { id: { _in: $userSessionIds } }\n\t\t\t\t_set: { status: \"Complete\", endTime: $endTime }\n\t\t\t}\n\t\t) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t\tupdateUsersMany(\n\t\t\tupdates: { where: { id: { _in: $userIds } }, _set: { status: \"Active\" } }\n\t\t) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n": types.EndSessionDocument,
    "\n\tmutation StartSession(\n\t\t$roomId: uuid = \"\"\n\t\t$data: [UserSessionsInsertInput!] = {}\n\t\t$userIds: [uuid!] = \"\"\n\t) {\n\t\tinsertSessionsOne(\n\t\t\tobject: { roomId: $roomId, userSessions: { data: $data } }\n\t\t) {\n\t\t\tid\n\t\t}\n\t\tupdateRoomsByPk(pkColumns: { id: $roomId }, _set: { status: \"In Use\" }) {\n\t\t\tid\n\t\t}\n\t\tupdateUsersMany(\n\t\t\tupdates: { where: { id: { _in: $userIds } }, _set: { status: \"In Room\" } }\n\t\t) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n": types.StartSessionDocument,
    "\n\tmutation UpdateQueueRotation(\n\t\t$endTime: timestamptz = \"\"\n\t\t$updateUserRotation: [uuid!] = \"\"\n\t\t$updateRotationMany: [RotationUpdates!] = {\n\t\t\twhere: { id: { _eq: \"\" } }\n\t\t\t_set: { userId: \"\" }\n\t\t}\n\t\t$insertUserRotation: [UserRotationInsertInput!] = {\n\t\t\trotationId: \"\"\n\t\t\tuserId: \"\"\n\t\t}\n\t) {\n\t\tupdateRotationMany(updates: $updateRotationMany) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tindex\n\t\t\t\ttype\n\t\t\t\tname\n\t\t\t\tcurrentUserRotation {\n\t\t\t\t\tid\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tactiveSession {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tstartTime\n\t\t\t\t\t\t\tendTime\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tupdateUserRotation(\n\t\t\twhere: { id: { _in: $updateUserRotation } }\n\t\t\t_set: { endTime: $endTime }\n\t\t) {\n\t\t\taffectedRows\n\t\t}\n\t\tinsertUserRotation(objects: $insertUserRotation) {\n\t\t\taffectedRows\n\t\t}\n\t}\n": types.UpdateQueueRotationDocument,
    "\n\tquery ActiveDancers {\n\t\tusers(\n\t\t\torderBy: { name: ASC }\n\t\t\twhere: { role: { _eq: \"dancer\" }, status: { _eq: \"Active\" } }\n\t\t) {\n\t\t\tid\n\t\t\tname\n\t\t\tstatus\n\t\t}\n\t}\n": types.ActiveDancersDocument,
    "\n\tquery QueueRotation {\n\t\trotation(orderBy: { index: ASC }, where: { type: { _eq: \"queue\" } }) {\n\t\t\tid\n\t\t\tindex\n\t\t\ttype\n\t\t\tname\n\t\t\tcurrentUserRotation {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tstatus\n\t\t\t\t\tactiveSession {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tstartTime\n\t\t\t\t\t\tendTime\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.QueueRotationDocument,
    "\n\tquery StageRotation {\n\t\trotation(orderBy: { index: ASC }, where: { type: { _eq: \"stage\" } }) {\n\t\t\tid\n\t\t\tindex\n\t\t\ttype\n\t\t\tname\n\t\t\tcurrentUserRotation {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.StageRotationDocument,
    "\n\tsubscription Rooms {\n\t\trooms(orderBy: { name: ASC }) {\n\t\t\tid\n\t\t\t...RoomsList\n\t\t\t...Room\n\t\t}\n\t}\n": types.RoomsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tfragment QueueSlot on Rotation {\n\t\tid\n\t\tindex\n\t\ttype\n\t\tname\n\t\tcurrentUserRotation {\n\t\t\tid\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\tactiveSession {\n\t\t\t\t\tid\n\t\t\t\t\tstartTime\n\t\t\t\t\tendTime\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment QueueSlot on Rotation {\n\t\tid\n\t\tindex\n\t\ttype\n\t\tname\n\t\tcurrentUserRotation {\n\t\t\tid\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\tactiveSession {\n\t\t\t\t\tid\n\t\t\t\t\tstartTime\n\t\t\t\t\tendTime\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tfragment Room on Rooms {\n\t\tid\n\t\tname\n\t\tstatus\n\t\tactiveSession {\n\t\t\tid\n\t\t\tstartTime\n\t\t\tendTime\n\t\t\tactiveUsers {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment Room on Rooms {\n\t\tid\n\t\tname\n\t\tstatus\n\t\tactiveSession {\n\t\t\tid\n\t\t\tstartTime\n\t\t\tendTime\n\t\t\tactiveUsers {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tfragment RoomsList on Rooms {\n\t\tid\n\t\t...Room\n\t}\n"): (typeof documents)["\n\tfragment RoomsList on Rooms {\n\t\tid\n\t\t...Room\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation EndSession(\n\t\t$roomId: uuid = \"\"\n\t\t$sessionId: uuid = \"\"\n\t\t$endTime: timestamptz = \"\"\n\t\t$userSessionIds: [uuid!] = \"\"\n\t\t$userIds: [uuid!] = \"\"\n\t) {\n\t\tupdateRoomsByPk(pkColumns: { id: $roomId }, _set: { status: \"Open\" }) {\n\t\t\tid\n\t\t}\n\t\tupdateSessionsByPk(\n\t\t\tpkColumns: { id: $sessionId }\n\t\t\t_set: { status: \"Complete\", endTime: $endTime }\n\t\t) {\n\t\t\tid\n\t\t}\n\t\tupdateUserSessionsMany(\n\t\t\tupdates: {\n\t\t\t\twhere: { id: { _in: $userSessionIds } }\n\t\t\t\t_set: { status: \"Complete\", endTime: $endTime }\n\t\t\t}\n\t\t) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t\tupdateUsersMany(\n\t\t\tupdates: { where: { id: { _in: $userIds } }, _set: { status: \"Active\" } }\n\t\t) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation EndSession(\n\t\t$roomId: uuid = \"\"\n\t\t$sessionId: uuid = \"\"\n\t\t$endTime: timestamptz = \"\"\n\t\t$userSessionIds: [uuid!] = \"\"\n\t\t$userIds: [uuid!] = \"\"\n\t) {\n\t\tupdateRoomsByPk(pkColumns: { id: $roomId }, _set: { status: \"Open\" }) {\n\t\t\tid\n\t\t}\n\t\tupdateSessionsByPk(\n\t\t\tpkColumns: { id: $sessionId }\n\t\t\t_set: { status: \"Complete\", endTime: $endTime }\n\t\t) {\n\t\t\tid\n\t\t}\n\t\tupdateUserSessionsMany(\n\t\t\tupdates: {\n\t\t\t\twhere: { id: { _in: $userSessionIds } }\n\t\t\t\t_set: { status: \"Complete\", endTime: $endTime }\n\t\t\t}\n\t\t) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t\tupdateUsersMany(\n\t\t\tupdates: { where: { id: { _in: $userIds } }, _set: { status: \"Active\" } }\n\t\t) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation StartSession(\n\t\t$roomId: uuid = \"\"\n\t\t$data: [UserSessionsInsertInput!] = {}\n\t\t$userIds: [uuid!] = \"\"\n\t) {\n\t\tinsertSessionsOne(\n\t\t\tobject: { roomId: $roomId, userSessions: { data: $data } }\n\t\t) {\n\t\t\tid\n\t\t}\n\t\tupdateRoomsByPk(pkColumns: { id: $roomId }, _set: { status: \"In Use\" }) {\n\t\t\tid\n\t\t}\n\t\tupdateUsersMany(\n\t\t\tupdates: { where: { id: { _in: $userIds } }, _set: { status: \"In Room\" } }\n\t\t) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation StartSession(\n\t\t$roomId: uuid = \"\"\n\t\t$data: [UserSessionsInsertInput!] = {}\n\t\t$userIds: [uuid!] = \"\"\n\t) {\n\t\tinsertSessionsOne(\n\t\t\tobject: { roomId: $roomId, userSessions: { data: $data } }\n\t\t) {\n\t\t\tid\n\t\t}\n\t\tupdateRoomsByPk(pkColumns: { id: $roomId }, _set: { status: \"In Use\" }) {\n\t\t\tid\n\t\t}\n\t\tupdateUsersMany(\n\t\t\tupdates: { where: { id: { _in: $userIds } }, _set: { status: \"In Room\" } }\n\t\t) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation UpdateQueueRotation(\n\t\t$endTime: timestamptz = \"\"\n\t\t$updateUserRotation: [uuid!] = \"\"\n\t\t$updateRotationMany: [RotationUpdates!] = {\n\t\t\twhere: { id: { _eq: \"\" } }\n\t\t\t_set: { userId: \"\" }\n\t\t}\n\t\t$insertUserRotation: [UserRotationInsertInput!] = {\n\t\t\trotationId: \"\"\n\t\t\tuserId: \"\"\n\t\t}\n\t) {\n\t\tupdateRotationMany(updates: $updateRotationMany) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tindex\n\t\t\t\ttype\n\t\t\t\tname\n\t\t\t\tcurrentUserRotation {\n\t\t\t\t\tid\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tactiveSession {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tstartTime\n\t\t\t\t\t\t\tendTime\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tupdateUserRotation(\n\t\t\twhere: { id: { _in: $updateUserRotation } }\n\t\t\t_set: { endTime: $endTime }\n\t\t) {\n\t\t\taffectedRows\n\t\t}\n\t\tinsertUserRotation(objects: $insertUserRotation) {\n\t\t\taffectedRows\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdateQueueRotation(\n\t\t$endTime: timestamptz = \"\"\n\t\t$updateUserRotation: [uuid!] = \"\"\n\t\t$updateRotationMany: [RotationUpdates!] = {\n\t\t\twhere: { id: { _eq: \"\" } }\n\t\t\t_set: { userId: \"\" }\n\t\t}\n\t\t$insertUserRotation: [UserRotationInsertInput!] = {\n\t\t\trotationId: \"\"\n\t\t\tuserId: \"\"\n\t\t}\n\t) {\n\t\tupdateRotationMany(updates: $updateRotationMany) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tindex\n\t\t\t\ttype\n\t\t\t\tname\n\t\t\t\tcurrentUserRotation {\n\t\t\t\t\tid\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tactiveSession {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tstartTime\n\t\t\t\t\t\t\tendTime\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tupdateUserRotation(\n\t\t\twhere: { id: { _in: $updateUserRotation } }\n\t\t\t_set: { endTime: $endTime }\n\t\t) {\n\t\t\taffectedRows\n\t\t}\n\t\tinsertUserRotation(objects: $insertUserRotation) {\n\t\t\taffectedRows\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery ActiveDancers {\n\t\tusers(\n\t\t\torderBy: { name: ASC }\n\t\t\twhere: { role: { _eq: \"dancer\" }, status: { _eq: \"Active\" } }\n\t\t) {\n\t\t\tid\n\t\t\tname\n\t\t\tstatus\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery ActiveDancers {\n\t\tusers(\n\t\t\torderBy: { name: ASC }\n\t\t\twhere: { role: { _eq: \"dancer\" }, status: { _eq: \"Active\" } }\n\t\t) {\n\t\t\tid\n\t\t\tname\n\t\t\tstatus\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery QueueRotation {\n\t\trotation(orderBy: { index: ASC }, where: { type: { _eq: \"queue\" } }) {\n\t\t\tid\n\t\t\tindex\n\t\t\ttype\n\t\t\tname\n\t\t\tcurrentUserRotation {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tstatus\n\t\t\t\t\tactiveSession {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tstartTime\n\t\t\t\t\t\tendTime\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery QueueRotation {\n\t\trotation(orderBy: { index: ASC }, where: { type: { _eq: \"queue\" } }) {\n\t\t\tid\n\t\t\tindex\n\t\t\ttype\n\t\t\tname\n\t\t\tcurrentUserRotation {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tstatus\n\t\t\t\t\tactiveSession {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tstartTime\n\t\t\t\t\t\tendTime\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery StageRotation {\n\t\trotation(orderBy: { index: ASC }, where: { type: { _eq: \"stage\" } }) {\n\t\t\tid\n\t\t\tindex\n\t\t\ttype\n\t\t\tname\n\t\t\tcurrentUserRotation {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery StageRotation {\n\t\trotation(orderBy: { index: ASC }, where: { type: { _eq: \"stage\" } }) {\n\t\t\tid\n\t\t\tindex\n\t\t\ttype\n\t\t\tname\n\t\t\tcurrentUserRotation {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tsubscription Rooms {\n\t\trooms(orderBy: { name: ASC }) {\n\t\t\tid\n\t\t\t...RoomsList\n\t\t\t...Room\n\t\t}\n\t}\n"): (typeof documents)["\n\tsubscription Rooms {\n\t\trooms(orderBy: { name: ASC }) {\n\t\t\tid\n\t\t\t...RoomsList\n\t\t\t...Room\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;