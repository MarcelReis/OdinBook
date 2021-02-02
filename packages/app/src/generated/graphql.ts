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
  friends: Array<User_Basic>;
};

export type CreateUserInput = {
  username: Scalars['String'];
  firstname: Scalars['String'];
  surname: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User_Full;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
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

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User_Full' }
    & Pick<User_Full, 'id' | 'username' | 'firstname' | 'thumb'>
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
    & Pick<User_Full, 'id' | 'firstname' | 'username'>
  ) }
);

export type UserPageQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserPageQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User_Full' }
    & Pick<User_Full, 'id' | 'name' | 'thumb'>
    & { friends: Array<(
      { __typename?: 'User_Basic' }
      & Pick<User_Basic, 'id' | 'firstname' | 'surname' | 'username'>
    )> }
  ) }
);

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User_Basic' }
    & Pick<User_Basic, 'thumb' | 'firstname' | 'surname' | 'username'>
  )> }
);
