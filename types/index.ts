export interface User {
  username: string;
  profilePic: string;
}

export interface Video {
  uri: string;
  user: User;
  likes: number;
  comments: number;
  shares: number;
  description: string;
  song: string;
}
