export type UserDocBasicInfo = {
  id: string;
  username: string;
  firstname: string;
  surname: string;
  thumb: string;
};

export type UserDoc = {
  id: string;
  username: string;
  firstname: string;
  surname: string;
  thumb: string;
  email: string;

  friends: [];
  friendRequests?: {
    incoming: [];
    outgoing: [];
  };
};
