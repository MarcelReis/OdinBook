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

export const enum ConnectionStatus {
  Pending = 'PENDING',
  Waiting = 'WAITING',
  Connected = 'CONNECTED',
  Blocked = 'BLOCKED'
};

export type CreateUserInput = {
  username: Scalars['String'];
  firstname: Scalars['String'];
  surname: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  createUserConnection: User;
  updateUserConnection: User;
  removeUserConnection: User;
  createPost: User;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateUserConnectionArgs = {
  username: Scalars['String'];
};


export type MutationUpdateUserConnectionArgs = {
  username: Scalars['String'];
  status: ConnectionStatus;
};


export type MutationRemoveUserConnectionArgs = {
  username: Scalars['String'];
};


export type MutationCreatePostArgs = {
  content: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  user: User;
  createdAt: Scalars['String'];
  content: Scalars['String'];
  likes: Array<Scalars['String']>;
  comments: Array<PostComment>;
};

export type PostComment = {
  __typename?: 'PostComment';
  id: Scalars['ID'];
  user: User;
  createdAt: Scalars['String'];
  content: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  user: User;
  users: Array<User>;
  hello: Scalars['String'];
  posts: Array<Post>;
};


export type QueryUserArgs = {
  username?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  firstname: Scalars['String'];
  surname: Scalars['String'];
  thumb?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  connections?: Maybe<Array<UserConnection>>;
  posts?: Maybe<Array<Post>>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  id: Scalars['ID'];
  user: User;
  createdAt: Scalars['String'];
  acceptedAt?: Maybe<Scalars['String']>;
  status?: Maybe<ConnectionStatus>;
};
