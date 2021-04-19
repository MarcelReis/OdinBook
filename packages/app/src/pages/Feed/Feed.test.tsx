import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import { loader } from "graphql.macro";
import { render, screen } from "../../setupTests";
import { CreatePostMutation, FeedPageQuery } from "../../generated/graphql";
import FeedPage from "./Feed";
import { waitFor } from "@testing-library/dom";

const query = loader("./FeedPage.graphql");
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
      },
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
            content: postText,
            createdAt: new Date().toISOString(),
            user: {
              id: Math.random().toString(36),
              firstname: "Marcelo",
              surname: "Reis",
              username: "_marcelreis",
              thumb: "https://placekitten.com/50",
            },
          },
        ],
      },
    },
  },
};

describe("FeedPage", () => {
  it("Should be able to create posts", async () => {
    render(
      <MockedProvider
        mocks={[mockFeedPageQuery, mockCreatePostMutation]}
        addTypename={true}
      >
        <FeedPage />
      </MockedProvider>
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
      <MockedProvider
        mocks={[mockFeedPageQuery, mockCreatePostMutation]}
        addTypename={true}
      >
        <FeedPage />
      </MockedProvider>
    );

    userEvent.type(await screen.findByRole("textbox"), postText);
    userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("Posting...")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText("Posting...")).not.toBeInTheDocument();
    });

    expect(screen.getByRole("textbox").textContent).toBe("");
    expect(await screen.findByText(postText)).toBeInTheDocument();
  });
});
