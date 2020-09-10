import { ensurePropsContainsNoUndefined } from '../../utils/Util';
import { IUser } from './IUser';
import UserId from './UserId/UserId';
import Profile from './Profile/Profile';

export type UserDataForTweet = {
  screenName: string;
  userImageURL: string;
  userName: string;
};

export type UserDataFull = {
  id: string;
  screen_name: string;
  user_name: string;
  header_image_url: string;
  user_image_url: string;
  bio: string;
  birthday: Date;
  user_location: string;
  website: string;
  created_at: Date;
  tweetCount: number;
  follower: string[];
  following: string[];
};

interface UserProps {
  readonly profile: Profile;
  readonly userId: UserId;
  readonly tweetCount: number;
  readonly followingMap: Map<string, Date>;
  readonly followerMap: Map<string, Date>;
}

// todo 集約なので private にしよう
export class User implements IUser {
  readonly tweetCount: number;

  readonly profile: Profile;

  readonly userId: UserId;

  readonly followingMap: Map<string, Date>;

  readonly followerMap: Map<string, Date>;

  constructor(props: UserProps) {
    ensurePropsContainsNoUndefined<UserProps>(props);
    const { tweetCount, profile, userId, followingMap, followerMap } = props;
    this.tweetCount = tweetCount;
    this.profile = profile;
    this.userId = userId;
    this.followingMap = followingMap;
    this.followerMap = followerMap;
  }
}
