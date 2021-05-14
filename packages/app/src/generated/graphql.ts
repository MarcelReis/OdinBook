import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum ConnectionStatus {
  Blocked = "BLOCKED",
  Connected = "CONNECTED",
  Pending = "PENDING",
  Self = "SELF",
  Waiting = "WAITING",
}

export type CreateUserInput = {
  username: Scalars["String"];
  firstname: Scalars["String"];
  surname: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
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
  username: Scalars["String"];
};

export type MutationUpdateUserConnectionArgs = {
  username: Scalars["String"];
  status: ConnectionStatus;
};

export type MutationDeleteUserConnectionArgs = {
  username: Scalars["String"];
};

export type MutationCreatePostArgs = {
  content: Scalars["String"];
};

export type MutationDeleteUserPostArgs = {
  id: Scalars["ID"];
};

export type Post = {
  __typename?: "Post";
  id: Scalars["ID"];
  owner?: Maybe<Scalars["Boolean"]>;
  user: User;
  createdAt: Scalars["String"];
  content: Scalars["String"];
  likes: Array<Scalars["String"]>;
  comments: Array<PostComment>;
};

export type PostComment = {
  __typename?: "PostComment";
  id: Scalars["ID"];
  user: User;
  createdAt: Scalars["String"];
  content: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  user: User;
  users: Array<User>;
  hello: Scalars["String"];
  posts: Array<Post>;
};

export type QueryUserArgs = {
  username?: Maybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  connectionStatus?: Maybe<ConnectionStatus>;
  connections?: Maybe<Array<UserConnection>>;
  email?: Maybe<Scalars["String"]>;
  firstname: Scalars["String"];
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  posts?: Maybe<Array<Post>>;
  surname: Scalars["String"];
  thumb?: Maybe<Scalars["String"]>;
  username: Scalars["String"];
};

export type UserConnection = {
  __typename?: "UserConnection";
  id: Scalars["ID"];
  user: User;
  createdAt: Scalars["String"];
  acceptedAt?: Maybe<Scalars["String"]>;
  status?: Maybe<ConnectionStatus>;
};

export type DeleteUserPostMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteUserPostMutation = { __typename?: "Mutation" } & {
  deleteUserPost: { __typename?: "User" } & Pick<User, "id">;
};

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentUserQuery = { __typename?: "Query" } & {
  user: { __typename?: "User" } & Pick<
    User,
    "id" | "username" | "firstname" | "surname" | "thumb"
  > & {
      connections?: Maybe<
        Array<
          { __typename?: "UserConnection" } & Pick<
            UserConnection,
            "id" | "status"
          > & {
              user: { __typename?: "User" } & Pick<
                User,
                "id" | "firstname" | "surname" | "username"
              >;
            }
        >
      >;
    };
};

export type CreatePostMutationVariables = Exact<{
  content: Scalars["String"];
}>;

export type CreatePostMutation = { __typename?: "Mutation" } & {
  createPost: { __typename?: "User" } & Pick<User, "id"> & {
      posts?: Maybe<
        Array<
          { __typename?: "Post" } & Pick<
            Post,
            "id" | "owner" | "createdAt" | "content"
          > & {
              user: { __typename?: "User" } & Pick<
                User,
                "id" | "firstname" | "surname" | "username" | "thumb"
              >;
            }
        >
      >;
    };
};

export type FeedPageQueryVariables = Exact<{ [key: string]: never }>;

export type FeedPageQuery = { __typename?: "Query" } & {
  user: { __typename?: "User" } & Pick<User, "id" | "thumb">;
  posts: Array<
    { __typename?: "Post" } & Pick<
      Post,
      "id" | "owner" | "createdAt" | "content"
    > & {
        user: { __typename?: "User" } & Pick<
          User,
          "id" | "username" | "firstname" | "surname" | "thumb"
        >;
      }
  >;
};

export type FinishSignUpMutationVariables = Exact<{
  input: CreateUserInput;
}>;

export type FinishSignUpMutation = { __typename?: "Mutation" } & {
  createUser: { __typename?: "User" } & Pick<
    User,
    "id" | "username" | "firstname" | "thumb"
  > & {
      connections?: Maybe<
        Array<{ __typename?: "UserConnection" } & Pick<UserConnection, "id">>
      >;
    };
};

export type GetUserQueryVariables = Exact<{
  username: Scalars["String"];
}>;

export type GetUserQuery = { __typename?: "Query" } & {
  user: { __typename?: "User" } & Pick<
    User,
    "id" | "firstname" | "surname" | "thumb"
  > & {
      posts?: Maybe<
        Array<
          { __typename?: "Post" } & Pick<
            Post,
            "id" | "owner" | "createdAt" | "content"
          > & {
              user: { __typename?: "User" } & Pick<
                User,
                "id" | "username" | "firstname" | "surname" | "thumb"
              >;
            }
        >
      >;
    };
};

export const DeleteUserPostDocument = gql`
  mutation DeleteUserPost($id: ID!) {
    deleteUserPost(id: $id) {
      id
    }
  }
`;
export type DeleteUserPostMutationFn = Apollo.MutationFunction<
  DeleteUserPostMutation,
  DeleteUserPostMutationVariables
>;

/**
 * __useDeleteUserPostMutation__
 *
 * To run a mutation, you first call `useDeleteUserPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserPostMutation, { data, loading, error }] = useDeleteUserPostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserPostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserPostMutation,
    DeleteUserPostMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteUserPostMutation,
    DeleteUserPostMutationVariables
  >(DeleteUserPostDocument, options);
}
export type DeleteUserPostMutationHookResult = ReturnType<
  typeof useDeleteUserPostMutation
>;
export type DeleteUserPostMutationResult = Apollo.MutationResult<DeleteUserPostMutation>;
export type DeleteUserPostMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserPostMutation,
  DeleteUserPostMutationVariables
>;
export const GetCurrentUserDocument = gql`
  query GetCurrentUser {
    user {
      id
      username
      firstname
      surname
      thumb
      connections {
        id
        user {
          id
          firstname
          surname
          username
        }
        status
      }
    }
  }
`;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    options
  );
}
export function useGetCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    options
  );
}
export type GetCurrentUserQueryHookResult = ReturnType<
  typeof useGetCurrentUserQuery
>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<
  typeof useGetCurrentUserLazyQuery
>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables
>;
export const CreatePostDocument = gql`
  mutation CreatePost($content: String!) {
    createPost(content: $content) {
      id
      posts {
        id
        owner
        createdAt
        content
        user {
          id
          firstname
          surname
          username
          thumb
        }
      }
    }
  }
`;
export type CreatePostMutationFn = Apollo.MutationFunction<
  CreatePostMutation,
  CreatePostMutationVariables
>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePostMutation,
    CreatePostMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    options
  );
}
export type CreatePostMutationHookResult = ReturnType<
  typeof useCreatePostMutation
>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
  CreatePostMutation,
  CreatePostMutationVariables
>;
export const FeedPageDocument = gql`
  query FeedPage {
    user {
      id
      thumb
    }
    posts {
      id
      owner
      createdAt
      content
      user {
        id
        username
        firstname
        surname
        thumb
      }
    }
  }
`;

/**
 * __useFeedPageQuery__
 *
 * To run a query within a React component, call `useFeedPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useFeedPageQuery(
  baseOptions?: Apollo.QueryHookOptions<FeedPageQuery, FeedPageQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FeedPageQuery, FeedPageQueryVariables>(
    FeedPageDocument,
    options
  );
}
export function useFeedPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FeedPageQuery,
    FeedPageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FeedPageQuery, FeedPageQueryVariables>(
    FeedPageDocument,
    options
  );
}
export type FeedPageQueryHookResult = ReturnType<typeof useFeedPageQuery>;
export type FeedPageLazyQueryHookResult = ReturnType<
  typeof useFeedPageLazyQuery
>;
export type FeedPageQueryResult = Apollo.QueryResult<
  FeedPageQuery,
  FeedPageQueryVariables
>;
export const FinishSignUpDocument = gql`
  mutation FinishSignUp($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      username
      firstname
      thumb
      connections {
        id
      }
    }
  }
`;
export type FinishSignUpMutationFn = Apollo.MutationFunction<
  FinishSignUpMutation,
  FinishSignUpMutationVariables
>;

/**
 * __useFinishSignUpMutation__
 *
 * To run a mutation, you first call `useFinishSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFinishSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [finishSignUpMutation, { data, loading, error }] = useFinishSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFinishSignUpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    FinishSignUpMutation,
    FinishSignUpMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    FinishSignUpMutation,
    FinishSignUpMutationVariables
  >(FinishSignUpDocument, options);
}
export type FinishSignUpMutationHookResult = ReturnType<
  typeof useFinishSignUpMutation
>;
export type FinishSignUpMutationResult = Apollo.MutationResult<FinishSignUpMutation>;
export type FinishSignUpMutationOptions = Apollo.BaseMutationOptions<
  FinishSignUpMutation,
  FinishSignUpMutationVariables
>;
export const GetUserDocument = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      id
      firstname
      surname
      thumb
      posts {
        id
        owner
        createdAt
        content
        user {
          id
          username
          firstname
          surname
          thumb
        }
      }
    }
  }
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  );
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  );
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>;
