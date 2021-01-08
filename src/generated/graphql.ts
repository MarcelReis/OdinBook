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
  uri: Scalars['String'];
  username: Scalars['String'];
  name: Scalars['String'];
  friends: Array<User>;
};

export type Deity = {
  __typename?: 'Deity';
  id: Scalars['ID'];
  uri: Scalars['String'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
};


export type MutationCreateUserArgs = {
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  user: User;
  deities: Array<Deity>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type QueryCreateAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryCreateAccountQuery = (
  { __typename?: 'Query' }
  & { deities: Array<(
    { __typename?: 'Deity' }
    & Pick<Deity, 'id' | 'uri' | 'name'>
  )> }
);
