export interface RegisterResponse extends UserInfo {}

export interface LoginResponse {
  token: string;
}

export interface UserInfo {
  id: string;
  username: string;
}

export interface Context {
  userInfo: UserInfo;
}

export interface MovieResponse {
  title: string;
  description: string;
  releaseDate: string;
  addedDate: Date;
  duration: number;
  actors: string[];
  thumbnail: string;
  ratings: number;
  ratingsAvg: number;
  creatorname: string;
}

export interface ReviewResponse {
  _id: string;
  comment: string;
  rating: number;
  movie: string;
  user: string;
}