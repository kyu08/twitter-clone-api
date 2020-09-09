import Profile from './Profile/Profile';
import UserId from './UserId/UserId';

export interface UserProps {
  readonly profile: Profile;
  readonly userId: UserId;
  readonly followerCount: number;
  readonly followingCount: number;
  readonly tweetCount: number;
  readonly followingMap: Map<string, Date>;
  readonly followerMap: Map<string, Date>;
}

export type IUser = UserProps;
