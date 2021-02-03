export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type User = {
  id: Scalars['ID'];
  username: Scalars['String'];
  firstname: Scalars['String'];
  surname: Scalars['String'];
  thumb?: Maybe<Scalars['String']>;
};

export type User_Basic = User & {
  __typename?: 'User_Basic';
  id: Scalars['ID'];
  username: Scalars['String'];
  firstname: Scalars['String'];
  surname: Scalars['String'];
  thumb?: Maybe<Scalars['String']>;
};

export type User_Full = User & {
  __typename?: 'User_Full';
  id: Scalars['ID'];
  username: Scalars['String'];
  name: Scalars['String'];
  firstname: Scalars['String'];
  surname: Scalars['String'];
  thumb?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  connections: Array<FriendConnection>;
};

export type CreateUserInput = {
  username: Scalars['String'];
  firstname: Scalars['String'];
  surname: Scalars['String'];
};

export const enum ConnectionStatus {
  Pending = 'PENDING',
  Waiting = 'WAITING',
  Connected = 'CONNECTED',
  Blocked = 'BLOCKED'
};

export type CreateFriendConnectionInput = {
  username: Scalars['String'];
};

export type UpdateFriendConnectionInput = {
  id: Scalars['String'];
  accept: Scalars['Boolean'];
};

export type FriendConnection = {
  __typename?: 'FriendConnection';
  id: Scalars['ID'];
  user: User_Basic;
  createdAt: Scalars['String'];
  acceptedAt?: Maybe<Scalars['String']>;
  status?: Maybe<ConnectionStatus>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User_Full;
  createFriendConnection: User_Full;
  updateFriendConnection: User_Full;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateFriendConnectionArgs = {
  input: CreateFriendConnectionInput;
};


export type MutationUpdateFriendConnectionArgs = {
  input: UpdateFriendConnectionInput;
};

export type Query = {
  __typename?: 'Query';
  user: User_Full;
  users: Array<User_Basic>;
  hello: Scalars['String'];
};


export type QueryUserArgs = {
  username?: Maybe<Scalars['String']>;
};
