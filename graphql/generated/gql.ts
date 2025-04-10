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
    "\n\tfragment Room on Rooms {\n\t\tid\n\t\tname\n\t\tstatus\n\t\tactiveSession {\n\t\t\tid\n\t\t\tstartTime\n\t\t\tendTime\n\t\t\tactiveUsers {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.RoomFragmentDoc,
    "\n\tfragment RoomsList on Rooms {\n\t\tid\n\t\t...Room\n\t}\n": typeof types.RoomsListFragmentDoc,
    "\n\tfragment Slot on Rotation {\n\t\tid\n\t\tindex\n\t\ttype\n\t\tname\n\t\tcurrentUserRotation {\n\t\t\tid\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\tactiveSession {\n\t\t\t\t\tid\n\t\t\t\t\tstartTime\n\t\t\t\t\tendTime\n\t\t\t\t\troom {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.SlotFragmentDoc,
    "\n\tmutation AddRoom($name: String = \"\") {\n\t\tinsertRoomsOne(object: { name: $name, status: \"Open\" }) {\n\t\t\tname\n\t\t\tstatus\n\t\t\tid\n\t\t}\n\t}\n": typeof types.AddRoomDocument,
    "\n\tmutation ChangeRotation(\n\t\t$endTime: timestamptz = \"\"\n\t\t$userRotationIds: [uuid!] = \"\"\n\t\t$updates: [RotationUpdates!] = {\n\t\t\twhere: { id: { _eq: \"\" } }\n\t\t\t_set: { userId: \"\" }\n\t\t}\n\t\t$objects: [UserRotationInsertInput!] = { rotationId: \"\", userId: \"\" }\n\t) {\n\t\tupdateRotationMany(updates: $updates) {\n\t\t\taffectedRows\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tindex\n\t\t\t\ttype\n\t\t\t\tname\n\t\t\t\tcurrentUserRotation {\n\t\t\t\t\tid\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tactiveSession {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tstartTime\n\t\t\t\t\t\t\tendTime\n\t\t\t\t\t\t\troom {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tupdateUserRotation(\n\t\t\twhere: { id: { _in: $userRotationIds } }\n\t\t\t_set: { endTime: $endTime }\n\t\t) {\n\t\t\taffectedRows\n\t\t}\n\t\tinsertUserRotation(objects: $objects) {\n\t\t\taffectedRows\n\t\t}\n\t}\n": typeof types.ChangeRotationDocument,
    "\n\tmutation EndSession(\n\t\t$roomId: uuid = \"\"\n\t\t$sessionId: uuid = \"\"\n\t\t$endTime: timestamptz = \"\"\n\t\t$userSessionIds: [uuid!] = \"\"\n\t\t$userIds: [uuid!] = \"\"\n\t) {\n\t\tupdateRoomsByPk(pkColumns: { id: $roomId }, _set: { status: \"Open\" }) {\n\t\t\tid\n\t\t}\n\t\tupdateSessionsByPk(\n\t\t\tpkColumns: { id: $sessionId }\n\t\t\t_set: { status: \"Complete\", endTime: $endTime }\n\t\t) {\n\t\t\tid\n\t\t}\n\t\tupdateUserSessionsMany(\n\t\t\tupdates: {\n\t\t\t\twhere: { id: { _in: $userSessionIds } }\n\t\t\t\t_set: { status: \"Complete\", endTime: $endTime }\n\t\t\t}\n\t\t) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t\tupdateUsersMany(\n\t\t\tupdates: { where: { id: { _in: $userIds } }, _set: { status: \"Active\" } }\n\t\t) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n": typeof types.EndSessionDocument,
    "\n\tmutation StartSession(\n\t\t$roomId: uuid = \"\"\n\t\t$data: [UserSessionsInsertInput!] = {}\n\t\t$userIds: [uuid!] = \"\"\n\t) {\n\t\tinsertSessionsOne(\n\t\t\tobject: { roomId: $roomId, userSessions: { data: $data } }\n\t\t) {\n\t\t\tid\n\t\t}\n\t\tupdateRoomsByPk(pkColumns: { id: $roomId }, _set: { status: \"In Use\" }) {\n\t\t\tid\n\t\t}\n\t\tupdateUsersMany(\n\t\t\tupdates: { where: { id: { _in: $userIds } }, _set: { status: \"In Room\" } }\n\t\t) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n": typeof types.StartSessionDocument,
    "\n\tmutation UpdateRotation(\n\t\t$updates: [RotationUpdates!] = {\n\t\t\twhere: { id: { _eq: \"\" } }\n\t\t\t_set: { userId: \"\" }\n\t\t}\n\t) {\n\t\tupdateRotationMany(updates: $updates) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tindex\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n": typeof types.UpdateRotationDocument,
    "\n\tquery ActiveDancers {\n\t\tusers(\n\t\t\torderBy: { name: ASC }\n\t\t\twhere: { role: { _eq: \"dancer\" }, status: { _eq: \"Active\" } }\n\t\t) {\n\t\t\tid\n\t\t\tname\n\t\t\tstatus\n\t\t}\n\t}\n": typeof types.ActiveDancersDocument,
    "\n\tsubscription Rooms {\n\t\trooms(orderBy: { name: ASC }) {\n\t\t\tid\n\t\t\t...RoomsList\n\t\t\t...Room\n\t\t}\n\t}\n": typeof types.RoomsDocument,
    "\n\tquery Rotation {\n\t\trotation(orderBy: { index: ASC }, where: { type: { _eq: \"queue\" } }) {\n\t\t\tid\n\t\t\tindex\n\t\t\ttype\n\t\t\tname\n\t\t\tcurrentUserRotation {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tstatus\n\t\t\t\t\tactiveSession {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tstartTime\n\t\t\t\t\t\tendTime\n\t\t\t\t\t\troom {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.RotationDocument,
    "\n\tquery Test {\n\t\trotation(where: { type: { _eq: \"queue\" } }) {\n\t\t\tid\n\t\t\tindex\n\t\t\tname\n\t\t}\n\t}\n": typeof types.TestDocument,
};
const documents: Documents = {
    "\n\tfragment Room on Rooms {\n\t\tid\n\t\tname\n\t\tstatus\n\t\tactiveSession {\n\t\t\tid\n\t\t\tstartTime\n\t\t\tendTime\n\t\t\tactiveUsers {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.RoomFragmentDoc,
    "\n\tfragment RoomsList on Rooms {\n\t\tid\n\t\t...Room\n\t}\n": types.RoomsListFragmentDoc,
    "\n\tfragment Slot on Rotation {\n\t\tid\n\t\tindex\n\t\ttype\n\t\tname\n\t\tcurrentUserRotation {\n\t\t\tid\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\tactiveSession {\n\t\t\t\t\tid\n\t\t\t\t\tstartTime\n\t\t\t\t\tendTime\n\t\t\t\t\troom {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.SlotFragmentDoc,
    "\n\tmutation AddRoom($name: String = \"\") {\n\t\tinsertRoomsOne(object: { name: $name, status: \"Open\" }) {\n\t\t\tname\n\t\t\tstatus\n\t\t\tid\n\t\t}\n\t}\n": types.AddRoomDocument,
    "\n\tmutation ChangeRotation(\n\t\t$endTime: timestamptz = \"\"\n\t\t$userRotationIds: [uuid!] = \"\"\n\t\t$updates: [RotationUpdates!] = {\n\t\t\twhere: { id: { _eq: \"\" } }\n\t\t\t_set: { userId: \"\" }\n\t\t}\n\t\t$objects: [UserRotationInsertInput!] = { rotationId: \"\", userId: \"\" }\n\t) {\n\t\tupdateRotationMany(updates: $updates) {\n\t\t\taffectedRows\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tindex\n\t\t\t\ttype\n\t\t\t\tname\n\t\t\t\tcurrentUserRotation {\n\t\t\t\t\tid\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tactiveSession {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tstartTime\n\t\t\t\t\t\t\tendTime\n\t\t\t\t\t\t\troom {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tupdateUserRotation(\n\t\t\twhere: { id: { _in: $userRotationIds } }\n\t\t\t_set: { endTime: $endTime }\n\t\t) {\n\t\t\taffectedRows\n\t\t}\n\t\tinsertUserRotation(objects: $objects) {\n\t\t\taffectedRows\n\t\t}\n\t}\n": types.ChangeRotationDocument,
    "\n\tmutation EndSession(\n\t\t$roomId: uuid = \"\"\n\t\t$sessionId: uuid = \"\"\n\t\t$endTime: timestamptz = \"\"\n\t\t$userSessionIds: [uuid!] = \"\"\n\t\t$userIds: [uuid!] = \"\"\n\t) {\n\t\tupdateRoomsByPk(pkColumns: { id: $roomId }, _set: { status: \"Open\" }) {\n\t\t\tid\n\t\t}\n\t\tupdateSessionsByPk(\n\t\t\tpkColumns: { id: $sessionId }\n\t\t\t_set: { status: \"Complete\", endTime: $endTime }\n\t\t) {\n\t\t\tid\n\t\t}\n\t\tupdateUserSessionsMany(\n\t\t\tupdates: {\n\t\t\t\twhere: { id: { _in: $userSessionIds } }\n\t\t\t\t_set: { status: \"Complete\", endTime: $endTime }\n\t\t\t}\n\t\t) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t\tupdateUsersMany(\n\t\t\tupdates: { where: { id: { _in: $userIds } }, _set: { status: \"Active\" } }\n\t\t) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n": types.EndSessionDocument,
    "\n\tmutation StartSession(\n\t\t$roomId: uuid = \"\"\n\t\t$data: [UserSessionsInsertInput!] = {}\n\t\t$userIds: [uuid!] = \"\"\n\t) {\n\t\tinsertSessionsOne(\n\t\t\tobject: { roomId: $roomId, userSessions: { data: $data } }\n\t\t) {\n\t\t\tid\n\t\t}\n\t\tupdateRoomsByPk(pkColumns: { id: $roomId }, _set: { status: \"In Use\" }) {\n\t\t\tid\n\t\t}\n\t\tupdateUsersMany(\n\t\t\tupdates: { where: { id: { _in: $userIds } }, _set: { status: \"In Room\" } }\n\t\t) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n": types.StartSessionDocument,
    "\n\tmutation UpdateRotation(\n\t\t$updates: [RotationUpdates!] = {\n\t\t\twhere: { id: { _eq: \"\" } }\n\t\t\t_set: { userId: \"\" }\n\t\t}\n\t) {\n\t\tupdateRotationMany(updates: $updates) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tindex\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n": types.UpdateRotationDocument,
    "\n\tquery ActiveDancers {\n\t\tusers(\n\t\t\torderBy: { name: ASC }\n\t\t\twhere: { role: { _eq: \"dancer\" }, status: { _eq: \"Active\" } }\n\t\t) {\n\t\t\tid\n\t\t\tname\n\t\t\tstatus\n\t\t}\n\t}\n": types.ActiveDancersDocument,
    "\n\tsubscription Rooms {\n\t\trooms(orderBy: { name: ASC }) {\n\t\t\tid\n\t\t\t...RoomsList\n\t\t\t...Room\n\t\t}\n\t}\n": types.RoomsDocument,
    "\n\tquery Rotation {\n\t\trotation(orderBy: { index: ASC }, where: { type: { _eq: \"queue\" } }) {\n\t\t\tid\n\t\t\tindex\n\t\t\ttype\n\t\t\tname\n\t\t\tcurrentUserRotation {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tstatus\n\t\t\t\t\tactiveSession {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tstartTime\n\t\t\t\t\t\tendTime\n\t\t\t\t\t\troom {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.RotationDocument,
    "\n\tquery Test {\n\t\trotation(where: { type: { _eq: \"queue\" } }) {\n\t\t\tid\n\t\t\tindex\n\t\t\tname\n\t\t}\n\t}\n": types.TestDocument,
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
export function gql(source: "\n\tfragment Room on Rooms {\n\t\tid\n\t\tname\n\t\tstatus\n\t\tactiveSession {\n\t\t\tid\n\t\t\tstartTime\n\t\t\tendTime\n\t\t\tactiveUsers {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment Room on Rooms {\n\t\tid\n\t\tname\n\t\tstatus\n\t\tactiveSession {\n\t\t\tid\n\t\t\tstartTime\n\t\t\tendTime\n\t\t\tactiveUsers {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tfragment RoomsList on Rooms {\n\t\tid\n\t\t...Room\n\t}\n"): (typeof documents)["\n\tfragment RoomsList on Rooms {\n\t\tid\n\t\t...Room\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tfragment Slot on Rotation {\n\t\tid\n\t\tindex\n\t\ttype\n\t\tname\n\t\tcurrentUserRotation {\n\t\t\tid\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\tactiveSession {\n\t\t\t\t\tid\n\t\t\t\t\tstartTime\n\t\t\t\t\tendTime\n\t\t\t\t\troom {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment Slot on Rotation {\n\t\tid\n\t\tindex\n\t\ttype\n\t\tname\n\t\tcurrentUserRotation {\n\t\t\tid\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\tactiveSession {\n\t\t\t\t\tid\n\t\t\t\t\tstartTime\n\t\t\t\t\tendTime\n\t\t\t\t\troom {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation AddRoom($name: String = \"\") {\n\t\tinsertRoomsOne(object: { name: $name, status: \"Open\" }) {\n\t\t\tname\n\t\t\tstatus\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation AddRoom($name: String = \"\") {\n\t\tinsertRoomsOne(object: { name: $name, status: \"Open\" }) {\n\t\t\tname\n\t\t\tstatus\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation ChangeRotation(\n\t\t$endTime: timestamptz = \"\"\n\t\t$userRotationIds: [uuid!] = \"\"\n\t\t$updates: [RotationUpdates!] = {\n\t\t\twhere: { id: { _eq: \"\" } }\n\t\t\t_set: { userId: \"\" }\n\t\t}\n\t\t$objects: [UserRotationInsertInput!] = { rotationId: \"\", userId: \"\" }\n\t) {\n\t\tupdateRotationMany(updates: $updates) {\n\t\t\taffectedRows\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tindex\n\t\t\t\ttype\n\t\t\t\tname\n\t\t\t\tcurrentUserRotation {\n\t\t\t\t\tid\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tactiveSession {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tstartTime\n\t\t\t\t\t\t\tendTime\n\t\t\t\t\t\t\troom {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tupdateUserRotation(\n\t\t\twhere: { id: { _in: $userRotationIds } }\n\t\t\t_set: { endTime: $endTime }\n\t\t) {\n\t\t\taffectedRows\n\t\t}\n\t\tinsertUserRotation(objects: $objects) {\n\t\t\taffectedRows\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation ChangeRotation(\n\t\t$endTime: timestamptz = \"\"\n\t\t$userRotationIds: [uuid!] = \"\"\n\t\t$updates: [RotationUpdates!] = {\n\t\t\twhere: { id: { _eq: \"\" } }\n\t\t\t_set: { userId: \"\" }\n\t\t}\n\t\t$objects: [UserRotationInsertInput!] = { rotationId: \"\", userId: \"\" }\n\t) {\n\t\tupdateRotationMany(updates: $updates) {\n\t\t\taffectedRows\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tindex\n\t\t\t\ttype\n\t\t\t\tname\n\t\t\t\tcurrentUserRotation {\n\t\t\t\t\tid\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tactiveSession {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tstartTime\n\t\t\t\t\t\t\tendTime\n\t\t\t\t\t\t\troom {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tupdateUserRotation(\n\t\t\twhere: { id: { _in: $userRotationIds } }\n\t\t\t_set: { endTime: $endTime }\n\t\t) {\n\t\t\taffectedRows\n\t\t}\n\t\tinsertUserRotation(objects: $objects) {\n\t\t\taffectedRows\n\t\t}\n\t}\n"];
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
export function gql(source: "\n\tmutation UpdateRotation(\n\t\t$updates: [RotationUpdates!] = {\n\t\t\twhere: { id: { _eq: \"\" } }\n\t\t\t_set: { userId: \"\" }\n\t\t}\n\t) {\n\t\tupdateRotationMany(updates: $updates) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tindex\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdateRotation(\n\t\t$updates: [RotationUpdates!] = {\n\t\t\twhere: { id: { _eq: \"\" } }\n\t\t\t_set: { userId: \"\" }\n\t\t}\n\t) {\n\t\tupdateRotationMany(updates: $updates) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t\tindex\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery ActiveDancers {\n\t\tusers(\n\t\t\torderBy: { name: ASC }\n\t\t\twhere: { role: { _eq: \"dancer\" }, status: { _eq: \"Active\" } }\n\t\t) {\n\t\t\tid\n\t\t\tname\n\t\t\tstatus\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery ActiveDancers {\n\t\tusers(\n\t\t\torderBy: { name: ASC }\n\t\t\twhere: { role: { _eq: \"dancer\" }, status: { _eq: \"Active\" } }\n\t\t) {\n\t\t\tid\n\t\t\tname\n\t\t\tstatus\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tsubscription Rooms {\n\t\trooms(orderBy: { name: ASC }) {\n\t\t\tid\n\t\t\t...RoomsList\n\t\t\t...Room\n\t\t}\n\t}\n"): (typeof documents)["\n\tsubscription Rooms {\n\t\trooms(orderBy: { name: ASC }) {\n\t\t\tid\n\t\t\t...RoomsList\n\t\t\t...Room\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery Rotation {\n\t\trotation(orderBy: { index: ASC }, where: { type: { _eq: \"queue\" } }) {\n\t\t\tid\n\t\t\tindex\n\t\t\ttype\n\t\t\tname\n\t\t\tcurrentUserRotation {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tstatus\n\t\t\t\t\tactiveSession {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tstartTime\n\t\t\t\t\t\tendTime\n\t\t\t\t\t\troom {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Rotation {\n\t\trotation(orderBy: { index: ASC }, where: { type: { _eq: \"queue\" } }) {\n\t\t\tid\n\t\t\tindex\n\t\t\ttype\n\t\t\tname\n\t\t\tcurrentUserRotation {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tstatus\n\t\t\t\t\tactiveSession {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tstartTime\n\t\t\t\t\t\tendTime\n\t\t\t\t\t\troom {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery Test {\n\t\trotation(where: { type: { _eq: \"queue\" } }) {\n\t\t\tid\n\t\t\tindex\n\t\t\tname\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Test {\n\t\trotation(where: { type: { _eq: \"queue\" } }) {\n\t\t\tid\n\t\t\tindex\n\t\t\tname\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;