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
    "\n\tquery Rooms {\n\t\trooms {\n\t\t\t...RoomsList\n\t\t\t# ...Room\n\t\t}\n\t}\n": typeof types.RoomsDocument,
    "\n\tfragment Room on Rooms {\n\t\tid\n\t\tname\n\t\tstatus\n\t\tactiveSession {\n\t\t\tid\n\t\t\tstartTime\n\t\t\tendTime\n\t\t\tactiveUsers {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.RoomFragmentDoc,
    "\n\tmutation EndSession(\n\t\t$roomId: uuid = \"\"\n\t\t$roomStatus: String = \"\"\n\t\t$sessionId: uuid = \"\"\n\t\t$sessionStatus: String = \"\"\n\t\t$endTime: timestamptz = \"\"\n\t\t$userSessionIds: [uuid!] = \"\"\n\t\t$userSessionStatus: String = \"\"\n\t) {\n\t\tupdateRoomsByPk(pkColumns: { id: $roomId }, _set: { status: $roomStatus }) {\n\t\t\tid\n\t\t}\n\t\tupdateSessionsByPk(\n\t\t\tpkColumns: { id: $sessionId }\n\t\t\t_set: { status: $sessionStatus, endTime: $endTime }\n\t\t) {\n\t\t\tid\n\t\t}\n\t\tupdateUserSessionsMany(\n\t\t\tupdates: {\n\t\t\t\twhere: { id: { _in: $userSessionIds } }\n\t\t\t\t_set: { status: $userSessionStatus, endTime: $endTime }\n\t\t\t}\n\t\t) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n": typeof types.EndSessionDocument,
    "\n\tfragment RoomsList on Rooms {\n\t\tid\n\t\t...Room\n\t}\n": typeof types.RoomsListFragmentDoc,
};
const documents: Documents = {
    "\n\tquery Rooms {\n\t\trooms {\n\t\t\t...RoomsList\n\t\t\t# ...Room\n\t\t}\n\t}\n": types.RoomsDocument,
    "\n\tfragment Room on Rooms {\n\t\tid\n\t\tname\n\t\tstatus\n\t\tactiveSession {\n\t\t\tid\n\t\t\tstartTime\n\t\t\tendTime\n\t\t\tactiveUsers {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.RoomFragmentDoc,
    "\n\tmutation EndSession(\n\t\t$roomId: uuid = \"\"\n\t\t$roomStatus: String = \"\"\n\t\t$sessionId: uuid = \"\"\n\t\t$sessionStatus: String = \"\"\n\t\t$endTime: timestamptz = \"\"\n\t\t$userSessionIds: [uuid!] = \"\"\n\t\t$userSessionStatus: String = \"\"\n\t) {\n\t\tupdateRoomsByPk(pkColumns: { id: $roomId }, _set: { status: $roomStatus }) {\n\t\t\tid\n\t\t}\n\t\tupdateSessionsByPk(\n\t\t\tpkColumns: { id: $sessionId }\n\t\t\t_set: { status: $sessionStatus, endTime: $endTime }\n\t\t) {\n\t\t\tid\n\t\t}\n\t\tupdateUserSessionsMany(\n\t\t\tupdates: {\n\t\t\t\twhere: { id: { _in: $userSessionIds } }\n\t\t\t\t_set: { status: $userSessionStatus, endTime: $endTime }\n\t\t\t}\n\t\t) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n": types.EndSessionDocument,
    "\n\tfragment RoomsList on Rooms {\n\t\tid\n\t\t...Room\n\t}\n": types.RoomsListFragmentDoc,
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
export function gql(source: "\n\tquery Rooms {\n\t\trooms {\n\t\t\t...RoomsList\n\t\t\t# ...Room\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Rooms {\n\t\trooms {\n\t\t\t...RoomsList\n\t\t\t# ...Room\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tfragment Room on Rooms {\n\t\tid\n\t\tname\n\t\tstatus\n\t\tactiveSession {\n\t\t\tid\n\t\t\tstartTime\n\t\t\tendTime\n\t\t\tactiveUsers {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment Room on Rooms {\n\t\tid\n\t\tname\n\t\tstatus\n\t\tactiveSession {\n\t\t\tid\n\t\t\tstartTime\n\t\t\tendTime\n\t\t\tactiveUsers {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation EndSession(\n\t\t$roomId: uuid = \"\"\n\t\t$roomStatus: String = \"\"\n\t\t$sessionId: uuid = \"\"\n\t\t$sessionStatus: String = \"\"\n\t\t$endTime: timestamptz = \"\"\n\t\t$userSessionIds: [uuid!] = \"\"\n\t\t$userSessionStatus: String = \"\"\n\t) {\n\t\tupdateRoomsByPk(pkColumns: { id: $roomId }, _set: { status: $roomStatus }) {\n\t\t\tid\n\t\t}\n\t\tupdateSessionsByPk(\n\t\t\tpkColumns: { id: $sessionId }\n\t\t\t_set: { status: $sessionStatus, endTime: $endTime }\n\t\t) {\n\t\t\tid\n\t\t}\n\t\tupdateUserSessionsMany(\n\t\t\tupdates: {\n\t\t\t\twhere: { id: { _in: $userSessionIds } }\n\t\t\t\t_set: { status: $userSessionStatus, endTime: $endTime }\n\t\t\t}\n\t\t) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation EndSession(\n\t\t$roomId: uuid = \"\"\n\t\t$roomStatus: String = \"\"\n\t\t$sessionId: uuid = \"\"\n\t\t$sessionStatus: String = \"\"\n\t\t$endTime: timestamptz = \"\"\n\t\t$userSessionIds: [uuid!] = \"\"\n\t\t$userSessionStatus: String = \"\"\n\t) {\n\t\tupdateRoomsByPk(pkColumns: { id: $roomId }, _set: { status: $roomStatus }) {\n\t\t\tid\n\t\t}\n\t\tupdateSessionsByPk(\n\t\t\tpkColumns: { id: $sessionId }\n\t\t\t_set: { status: $sessionStatus, endTime: $endTime }\n\t\t) {\n\t\t\tid\n\t\t}\n\t\tupdateUserSessionsMany(\n\t\t\tupdates: {\n\t\t\t\twhere: { id: { _in: $userSessionIds } }\n\t\t\t\t_set: { status: $userSessionStatus, endTime: $endTime }\n\t\t\t}\n\t\t) {\n\t\t\treturning {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tfragment RoomsList on Rooms {\n\t\tid\n\t\t...Room\n\t}\n"): (typeof documents)["\n\tfragment RoomsList on Rooms {\n\t\tid\n\t\t...Room\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;