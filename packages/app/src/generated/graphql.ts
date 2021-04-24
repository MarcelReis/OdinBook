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

export enum ConnectionStatus {
  Blocked = 'BLOCKED',
  Connected = 'CONNECTED',
  Pending = 'PENDING',
  Self = 'SELF',
  Waiting = 'WAITING'
}

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
  deleteUserConnection: User;
  createPost: User;
  deleteUserPost: User;
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


export type MutationDeleteUserConnectionArgs = {
  username: Scalars['String'];
};


export type MutationCreatePostArgs = {
  content: Scalars['String'];
};


export type MutationDeleteUserPostArgs = {
  id: Scalars['ID'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  owner?: Maybe<Scalars['Boolean']>;
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
  connectionStatus?: Maybe<ConnectionStatus>;
  connections?: Maybe<Array<UserConnection>>;
  email?: Maybe<Scalars['String']>;
  firstname: Scalars['String'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Post>>;
  surname: Scalars['String'];
  thumb?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  id: Scalars['ID'];
  user: User;
  createdAt: Scalars['String'];
  acceptedAt?: Maybe<Scalars['String']>;
  status?: Maybe<ConnectionStatus>;
};

export type DeleteUserPostMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteUserPostMutation = (
  { __typename?: 'Mutation' }
  & { deleteUserPost: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'firstname' | 'surname' | 'thumb'>
    & { connections?: Maybe<Array<(
      { __typename?: 'UserConnection' }
      & Pick<UserConnection, 'id' | 'status'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'firstname' | 'surname' | 'username'>
      ) }
    )>> }
  ) }
);

export type CreatePostMutationVariables = Exact<{
  content: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { posts?: Maybe<Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'owner' | 'createdAt' | 'content'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'firstname' | 'surname' | 'username' | 'thumb'>
      ) }
    )>> }
  ) }
);

export type FeedPageQueryVariables = Exact<{ [key: string]: never; }>;


export type FeedPageQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'thumb'>
  ), posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'owner' | 'createdAt' | 'content'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'firstname' | 'surname' | 'thumb'>
    ) }
  )> }
);

export type FinishSignUpMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type FinishSignUpMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'firstname' | 'thumb'>
    & { connections?: Maybe<Array<(
      { __typename?: 'UserConnection' }
      & Pick<UserConnection, 'id'>
    )>> }
  ) }
);

export type GetUserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstname' | 'surname' | 'thumb'>
    & { posts?: Maybe<Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'owner' | 'createdAt' | 'content'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'firstname' | 'surname' | 'thumb'>
      ) }
    )>> }
  ) }
);
