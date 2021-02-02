type UserFriend = {
  string: string;
  username: string;
};

type FriendRequest = {
  username: string;
  date: Date;
};

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

  friends: UserFriend[];
  friendRequests: {
    incoming: FriendRequest[];
    outgoing: FriendRequest[];
  };
};
