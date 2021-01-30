type UserFriend = {
  string: string;
  username: string;
};

type FriendRequest = {
  username: string;
  date: Date;
};

type UserDoc = {
  name: string;
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
