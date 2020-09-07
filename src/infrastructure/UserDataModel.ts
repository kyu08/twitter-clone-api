import { IUser } from '../model/User/IUser';
import { dateToString } from '../utils/Util';

type UserPropsDetail = {
  id: string;
  screen_name: string;
  user_name: string;
  header_image_url: string;
  user_image_url: string;
  bio: string;
  birthday: string;
  user_location: string;
  website: string;
  created_at?: string;
  followerCount: number;
  followingCount: number;
  tweetCount: number;
};

export class UserDataModel {
  readonly screenName: string;

  readonly userName: string;

  readonly headerImageURL: string;

  readonly userImageURL: string;

  readonly bio: string;

  readonly birthday: string;

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
    this.birthday = dateToString(birthday.birthday);
  }

  build(): UserPropsDetail {
    return {
      id: this.userId,
      screen_name: this.screenName,
      user_name: this.userName,
      header_image_url: this.headerImageURL,
      user_image_url: this.userImageURL,
      bio: this.bio,
      birthday: this.birthday,
      user_location: this.userLocation,
      website: this.website,
      // todo created at ももってくる
      // created_at: this,
      followerCount: this.followerCount,
      followingCount: this.followingCount,
      tweetCount: this.tweetCount,
    };
  }
}
