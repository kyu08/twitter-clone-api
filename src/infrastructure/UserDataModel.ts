import { IUser } from '../model/User/IUser';
import { dateToString } from '../utils/Util';

interface UserPropsDetail {
  readonly id: string;
  readonly screen_name: string;
  readonly user_name: string;
  readonly header_image_url: string;
  readonly user_image_url: string;
  readonly bio: string;
  readonly birthday: string;
  readonly user_location: string;
  readonly website: string;
  readonly created_at?: string;
  readonly followerCount: number;
  readonly followingCount: number;
  readonly tweetCount: number;
  readonly followingMap: Map<string, Date>;
  readonly followerMap: Map<string, Date>;
}

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

  readonly followingMap: Map<string, Date>;

  readonly followerMap: Map<string, Date>;

  constructor({
    profile,
    userId,
    followerCount,
    followingCount,
    tweetCount,
    followingMap,
    followerMap,
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
    this.followerMap = followerMap;
    this.followingMap = followingMap;
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
      followerMap: this.followerMap,
      followingMap: this.followingMap,
    };
  }

  toJSON(): string {
    const object = this.build();
    const mapToArray = {
      ...object,
      ...{
        followerMap: Array.from(object.followerMap),
        followingMap: Array.from(object.followingMap),
      },
    };
    return JSON.stringify(mapToArray);
  }
}
