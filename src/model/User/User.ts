import { ensurePropsContainsNoUndefined } from '../../utils/Util';
import { IUser } from './IUser';
import UserId from './UserId/UserId';
import Profile from './Profile/Profile';

interface UserProps {
  readonly profile: Profile;
  readonly userId: UserId;
  readonly followerCount: number;
  readonly followingCount: number;
  readonly tweetCount: number;
  readonly followingMap: Map<string, Date>;
  readonly followerMap: Map<string, Date>;
}

// todo 集約なので private にしよう
export class User implements IUser {
  readonly followerCount: number;

  readonly followingCount: number;

  readonly tweetCount: number;

  readonly profile: Profile;

  readonly userId: UserId;

  readonly followingMap: Map<string, Date>;

  readonly followerMap: Map<string, Date>;

  constructor(props: UserProps) {
    ensurePropsContainsNoUndefined<UserProps>(props);
    const {
      followerCount,
      followingCount,
      tweetCount,
      profile,
      userId,
      followingMap,
      followerMap,
    } = props;
    this.followerCount = followerCount;
    this.followingCount = followingCount;
    this.tweetCount = tweetCount;
    this.profile = profile;
    this.userId = userId;
    this.followingMap = followingMap;
    this.followerMap = followerMap;
  }
}
