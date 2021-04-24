export type PostCommentDoc = {
  user: {
    id: string;
    username: string;
    firstname: string;
    surname: string;
  };
  createdAt: string;
  content: string;
  likes: string[];
};
