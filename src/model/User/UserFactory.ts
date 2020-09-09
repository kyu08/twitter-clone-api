import UserId from './UserId/UserId';
import { User } from './User';
import Profile from './Profile/Profile';
import Website from './Profile/Website';
import UserLocation from './Profile/UserLocation';
import Bio from './Profile/Bio';
import UserImageURL from './Profile/UserImageURL';
import HeaderImageURL from './Profile/HeaderImageURL';
import UserName from './Profile/UserName';
import ScreenName from './Profile/ScreenName';
import { UserDataModel } from '../../infrastructure/UserDataModel';
import Birthday from './Profile/Birthday';

export type UserPropsDetail = {
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
  followerCount: number;
  followingCount: number;
  tweetCount: number;
  // todo ~List? Set?
  // todo created at ももってくるようにする (Map or object にする)
  follower: string[];
  following: string[];
};

export class UserFactory {
  toInstance({
    id: userId,
    screen_name: screenName,
    user_name: userName,
    header_image_url: headerImageURL,
    user_image_url: userImageURL,
    bio,
    birthday: birthdayProp,
    user_location: userLocation,
    website,
    // created_at: createdAt,
    followerCount,
    followingCount,
    tweetCount,
    following,
    follower,
  }: UserPropsDetail): User {
    const profileProps = {
      screenName: new ScreenName(screenName),
      userName: new UserName(userName),
      headerImageURL: new HeaderImageURL(headerImageURL),
      userImageURL: new UserImageURL(userImageURL),
      bio: new Bio(bio),
      userLocation: new UserLocation(userLocation),
      website: new Website(website),
      birthday: new Birthday(new Date(birthdayProp)),
    };
    const profile = new Profile(profileProps);
    const followingMapProps = following.map<[string, Date]>((f) => {
      return [f, new Date()];
    });
    const followerMapProps = follower.map<[string, Date]>((f) => {
      return [f, new Date()];
    });
    const followingMap: Map<string, Date> = new Map(followingMapProps);
    const followerMap: Map<string, Date> = new Map(followerMapProps);

    return new User({
      profile,
      followerCount,
      followingCount,
      tweetCount,
      userId: new UserId(userId),
      followerMap,
      followingMap,
    });
  }

  toDataModel(user: User): UserDataModel {
    return new UserDataModel(user);
  }
}
