import Profile from './Profile/Profile';
import UserId from './UserId/UserId';

export interface UserProps {
  readonly profile: Profile;
  readonly userId: UserId;
  readonly followerCount: number;
  readonly followingCount: number;
  readonly tweetCount: number;
}

export type IUser = UserProps;
