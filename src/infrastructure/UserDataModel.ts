import { IUser } from '../model/User/IUser';
import { BirthdayProps } from '../model/User/Profile/Birthday';

export class UserDataModel {
  readonly screenName: string;

  readonly userName: string;

  readonly headerImageURL: string;

  readonly userImageURL: string;

  readonly bio: string;

  readonly birthday?: BirthdayProps;

  readonly userLocation: string;

  readonly website: string;

  readonly userId: string;

  // todo 本当は ↓この3つ、 toLocaleString() して string として扱いたいかもしれない?
  // todo User, UserDataModel に followingList, followerList をもたせる
  // followerCount, followingCount はメソッドを通して提供する
  readonly followerCount: number;

  readonly followingCount: number;

  readonly tweetCount: number;

  constructor({
    profile,
    userId,
    followerCount,
    followingCount,
    tweetCount,
  }: IUser) {
    const {
      bio,
      birthday,
      headerImageURL,
      screenName,
      userImageURL,
      userLocation,
      userName,
      website,
    } = profile;
    if (birthday) {
      this.birthday = {
        year: birthday.year.year,
        month: birthday.month.month,
        day: birthday.day.day,
      };
    }
    this.screenName = screenName.screenName;
    this.userName = userName.userName;
    this.headerImageURL = headerImageURL.headerImageURL;
    this.userImageURL = userImageURL.userImageURL;
    this.bio = bio.bio;
    this.userLocation = userLocation.userLocation;
    this.website = website.website;
    this.userId = userId.userId;
    this.followerCount = followerCount;
    this.followingCount = followingCount;
    this.tweetCount = tweetCount;
  }
}
