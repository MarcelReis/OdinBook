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
