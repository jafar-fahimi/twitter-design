export type PostType = {
  timestamp: Timestamp;
  text: string;
  tag: string;
  username: string;
  userImg: any;
};

export type changedSessionType = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    tag?: string | null;
    uid?: string | null;
  };
  expires: string;
};
