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
  __typename?: 'User';
  connectionStatus?: Maybe<ConnectionStatus>;
  connections?: Maybe<Array<FriendConnection>>;
  email?: Maybe<Scalars['String']>;
  firstname: Scalars['String'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
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
  user: User;
  createdAt: Scalars['String'];
  acceptedAt?: Maybe<Scalars['String']>;
  status?: Maybe<ConnectionStatus>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  createUserConnection: User;
  updateUserConnection: User;
  removeUserConnection: User;
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
  user: User;
  users: Array<User>;
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
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
    & { connections?: Maybe<Array<(
      { __typename?: 'FriendConnection' }
      & Pick<FriendConnection, 'id' | 'status'>
    )>> }
  ) }
);

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'firstname' | 'thumb'>
    & { connections?: Maybe<Array<(
      { __typename?: 'FriendConnection' }
      & Pick<FriendConnection, 'id' | 'status'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'firstname' | 'surname' | 'username'>
      ) }
    )>> }
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
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'firstname' | 'thumb'>
    & { connections?: Maybe<Array<(
      { __typename?: 'FriendConnection' }
      & Pick<FriendConnection, 'id' | 'status'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'firstname' | 'surname' | 'username'>
      ) }
    )>> }
  ) }
);

export type UserPageQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserPageQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'thumb' | 'username' | 'connectionStatus'>
    & { connections?: Maybe<Array<(
      { __typename?: 'FriendConnection' }
      & Pick<FriendConnection, 'id' | 'status'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'firstname' | 'surname' | 'username'>
      ) }
    )>> }
  ) }
);

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'thumb' | 'firstname' | 'surname' | 'username' | 'connectionStatus'>
  )> }
);
