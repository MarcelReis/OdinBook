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
  thumb: Scalars['String'];
  email: Scalars['String'];
  friends: Array<User>;
  deity: Deity;
};

export type Deity = {
  __typename?: 'Deity';
  id: Scalars['ID'];
  uri: Scalars['String'];
  name: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  user: User;
  datetime: Scalars['String'];
  likes: Scalars['Int'];
  comments: Array<Comment>;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  user: User;
  datetime: Scalars['String'];
  content: Scalars['String'];
  likes: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: User;
};


export type MutationCreateAccountArgs = {
  firstName: Scalars['String'];
  surname: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  deityID: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  user: User;
  deities: Array<Deity>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type CreateAccountMutationVariables = Exact<{
  firstName: Scalars['String'];
  surname: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  deityID: Scalars['String'];
}>;


export type CreateAccountMutation = (
  { __typename?: 'Mutation' }
  & { createAccount: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);

export type QueryCreateAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryCreateAccountQuery = (
  { __typename?: 'Query' }
  & { deities: Array<(
    { __typename?: 'Deity' }
    & Pick<Deity, 'id' | 'uri' | 'name'>
  )> }
);
