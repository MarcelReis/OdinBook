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
  id: Scalars['ID'];
  username: Scalars['String'];
  name: Scalars['String'];
  firstname: Scalars['String'];
  surname: Scalars['String'];
  thumb?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  friends: Array<User>;
};

export type CreateUserInput = {
  username?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type Query = {
  __typename?: 'Query';
  user: User;
  hello: Scalars['String'];
};


export type QueryUserArgs = {
  username?: Maybe<Scalars['String']>;
};

export type AppbarQueryVariables = Exact<{ [key: string]: never; }>;


export type AppbarQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'firstname' | 'thumb'>
  ) }
);

export type FeedPageQueryVariables = Exact<{ [key: string]: never; }>;


export type FeedPageQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type UserPageQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserPageQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'thumb'>
    & { friends: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'username'>
    )> }
  ) }
);
