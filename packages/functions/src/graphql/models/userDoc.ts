type UserFriend = {
  string: string;
  username: string;
};

type FriendRequest = {
  username: string;
  date: Date;
};

export type UserDoc = {
  uid: string;
  firstname: string;
  surname: string;
  email: string;
  thumb: string;
  username: string;

  friends: UserFriend[];
  friendRequests: {
    incoming: FriendRequest[];
    outgoing: FriendRequest[];
  };
};
