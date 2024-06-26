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
 */
const documents = {
    "fragment SimpleUser on User {\n  id\n  username\n}": types.SimpleUserFragmentDoc,
    "mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    ...SimpleUser\n  }\n}": types.ChangePasswordDocument,
    "mutation CreatePost($postInput: PostInput) {\n  createPost(postInput: $postInput) {\n    id\n    text\n    author {\n      id\n      username\n    }\n    updatedAt\n  }\n}": types.CreatePostDocument,
    "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}": types.ForgotPasswordDocument,
    "mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(userInput: {usernameOrEmail: $usernameOrEmail, password: $password}) {\n    ...SimpleUser\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "mutation Register($username: String!, $password: String!, $email: String!) {\n  register(userInput: {username: $username, password: $password, email: $email}) {\n    ...SimpleUser\n  }\n}": types.RegisterDocument,
    "query Me {\n  me {\n    ...SimpleUser\n  }\n}": types.MeDocument,
    "query GetPosts {\n  getPosts {\n    id\n    title\n    createdAt\n    updatedAt\n  }\n}": types.GetPostsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SimpleUser on User {\n  id\n  username\n}"): (typeof documents)["fragment SimpleUser on User {\n  id\n  username\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    ...SimpleUser\n  }\n}"): (typeof documents)["mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    ...SimpleUser\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreatePost($postInput: PostInput) {\n  createPost(postInput: $postInput) {\n    id\n    text\n    author {\n      id\n      username\n    }\n    updatedAt\n  }\n}"): (typeof documents)["mutation CreatePost($postInput: PostInput) {\n  createPost(postInput: $postInput) {\n    id\n    text\n    author {\n      id\n      username\n    }\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"): (typeof documents)["mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(userInput: {usernameOrEmail: $usernameOrEmail, password: $password}) {\n    ...SimpleUser\n  }\n}"): (typeof documents)["mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(userInput: {usernameOrEmail: $usernameOrEmail, password: $password}) {\n    ...SimpleUser\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($username: String!, $password: String!, $email: String!) {\n  register(userInput: {username: $username, password: $password, email: $email}) {\n    ...SimpleUser\n  }\n}"): (typeof documents)["mutation Register($username: String!, $password: String!, $email: String!) {\n  register(userInput: {username: $username, password: $password, email: $email}) {\n    ...SimpleUser\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    ...SimpleUser\n  }\n}"): (typeof documents)["query Me {\n  me {\n    ...SimpleUser\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetPosts {\n  getPosts {\n    id\n    title\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["query GetPosts {\n  getPosts {\n    id\n    title\n    createdAt\n    updatedAt\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;