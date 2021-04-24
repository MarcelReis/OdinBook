import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import { loader } from "graphql.macro";
import { render, screen } from "../../setupTests";
import { CreatePostMutation, FeedPageQuery } from "../../generated/graphql";
import FeedPage from "./Feed";
import { waitFor } from "@testing-library/dom";
import { MemoryRouter } from "react-router";
import { cache } from "../../apollo/cache";

const query = loader("./FeedPage.graphql");
console.log("query :>> ", query);
const mutation = loader("./CreatePost.graphql");

const postText = "This is an awesome post";

const mockFeedPageQuery: MockedResponse<FeedPageQuery> = {
  request: {
    query: query,
  },
  result: {
    data: {
      user: {
        id: Math.random().toString(36),
        thumb: Math.random().toString(36),
        __typename: "User",
      },
      posts: [
        {
          id: "-MYbcL6QjbrTcsKA1MTL",
          owner: false,
          createdAt: "2021-04-19T00:56:56.541Z",
          content: "This is my first post ever, I hope it works!",
          user: {
            id: "coYM9nbpolZKaZAg1Sygb05h5itA",
            username: "_marcelreis",
            firstname: "Marcelo",
            surname: "Reis",
            thumb: "https://randomuser.me/api/portraits/men/17.jpg",
            __typename: "User",
          },
          __typename: "Post",
        },
      ],
    },
  },
};

const mockCreatePostMutation: MockedResponse<CreatePostMutation> = {
  request: {
    query: mutation,
    variables: { content: postText },
  },
  result: {
    data: {
      createPost: {
        id: Math.random().toString(36),
        posts: [
          {
            id: Math.random().toString(36),
            owner: true,
            createdAt: new Date().toISOString(),
            content: postText,
            user: {
              id: Math.random().toString(36),
              firstname: "Marcelo",
              surname: "Reis",
              username: "_marcelreis",
              thumb: "https://placekitten.com/50",
              __typename: "User",
            },
            __typename: "Post",
          },
        ],
        __typename: "User",
      },
    },
  },
};

describe("FeedPage", () => {
  it("Should be able to create posts", async () => {
    render(
      <MemoryRouter>
        <MockedProvider
          mocks={[mockFeedPageQuery, mockCreatePostMutation]}
          cache={cache}
        >
          <FeedPage />
        </MockedProvider>
      </MemoryRouter>
    );

    userEvent.type(await screen.findByRole("textbox"), postText);
    userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("Posting...")).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeDisabled();
      expect(screen.getByRole("textbox")).toBeDisabled();
      expect(screen.getByRole("textbox").textContent).toBe(postText);
    });

    await waitFor(() => {
      expect(screen.queryByText("Posting...")).not.toBeInTheDocument();
      expect(screen.getByRole("button")).toBeEnabled();
      expect(screen.getByRole("textbox")).toBeEnabled();
      expect(screen.getByRole("textbox").textContent).toBe("");
    });
  });

  it("Should add new posts to the top of the page", async () => {
    render(
      <MemoryRouter>
        <MockedProvider
          mocks={[mockFeedPageQuery, mockCreatePostMutation]}
          cache={cache}
        >
          <FeedPage />
        </MockedProvider>
      </MemoryRouter>
    );

    userEvent.type(await screen.findByRole("textbox"), postText);
    userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("Posting...")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText("Posting...")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByRole("textbox").textContent).toBe("");
      expect(screen.getByText(postText)).toBeInTheDocument();
    });
  });

  it("Should block users from creating invalid posts", async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={[mockFeedPageQuery]} cache={cache}>
          <FeedPage />
        </MockedProvider>
      </MemoryRouter>
    );

    userEvent.type(await screen.findByRole("textbox"), " ");

    const button = screen.getByRole("button");
    expect(button).toBeEnabled();
    userEvent.click(button);

    await waitFor(() => {
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(screen.getByRole("textbox").textContent).toBe(" ");
    });

    userEvent.type(await screen.findByRole("textbox"), "valid text");
    await waitFor(() => {
      expect(button).toBeEnabled();
    });
  });
});
