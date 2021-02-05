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
  connectionStatus?: Maybe<ConnectionStatus>;
  firstname: Scalars['String'];
  id: Scalars['ID'];
  surname: Scalars['String'];
  thumb?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type User_Basic = User & {
  __typename?: 'User_Basic';
  connectionStatus?: Maybe<ConnectionStatus>;
  firstname: Scalars['String'];
  id: Scalars['ID'];
  surname: Scalars['String'];
  thumb?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type User_Full = User & {
  __typename?: 'User_Full';
  connectionStatus?: Maybe<ConnectionStatus>;
  connections: Array<FriendConnection>;
  email: Scalars['String'];
  firstname: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  surname: Scalars['String'];
  thumb?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type CreateUserInput = {
  username: Scalars['String'];
  firstname: Scalars['String'];
  surname: Scalars['String'];
};

export enum ConnectionStatus {
  Blocked = 'BLOCKED',
  Connected = 'CONNECTED',
  Pending = 'PENDING',
  Self = 'SELF',
  Waiting = 'WAITING'
}

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
  createUserConnection: User_Full;
  updateUserConnection: User_Full;
  removeUserConnection: User_Full;
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

export type Query = {
  __typename?: 'Query';
  user: User_Full;
  users: Array<User_Basic>;
  hello: Scalars['String'];
};


export type QueryUserArgs = {
  username?: Maybe<Scalars['String']>;
};

export type CreateFriendConnectionMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type CreateFriendConnectionMutation = (
  { __typename?: 'Mutation' }
  & { createUserConnection: (
    { __typename?: 'User_Full' }
    & Pick<User_Full, 'id' | 'username'>
    & { connections: Array<(
      { __typename?: 'FriendConnection' }
      & Pick<FriendConnection, 'id' | 'status'>
    )> }
  ) }
);

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User_Full' }
    & Pick<User_Full, 'id' | 'username' | 'firstname' | 'thumb'>
    & { connections: Array<(
      { __typename?: 'FriendConnection' }
      & Pick<FriendConnection, 'id' | 'status'>
      & { user: (
        { __typename?: 'User_Basic' }
        & Pick<User_Basic, 'id' | 'firstname' | 'surname' | 'username'>
      ) }
    )> }
  ) }
);

export type FeedPageQueryVariables = Exact<{ [key: string]: never; }>;


export type FeedPageQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type FinishRegistrationMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type FinishRegistrationMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User_Full' }
    & Pick<User_Full, 'id' | 'username' | 'firstname' | 'thumb'>
    & { connections: Array<(
      { __typename?: 'FriendConnection' }
      & Pick<FriendConnection, 'id' | 'status'>
      & { user: (
        { __typename?: 'User_Basic' }
        & Pick<User_Basic, 'id' | 'firstname' | 'surname' | 'username'>
      ) }
    )> }
  ) }
);

export type UserPageQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserPageQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User_Full' }
    & Pick<User_Full, 'id' | 'name' | 'thumb' | 'username' | 'connectionStatus'>
    & { connections: Array<(
      { __typename?: 'FriendConnection' }
      & Pick<FriendConnection, 'id' | 'status'>
      & { user: (
        { __typename?: 'User_Basic' }
        & Pick<User_Basic, 'id' | 'firstname' | 'surname' | 'username'>
      ) }
    )> }
  ) }
);

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User_Basic' }
    & Pick<User_Basic, 'thumb' | 'firstname' | 'surname' | 'username' | 'connectionStatus'>
  )> }
);
