import UserId from './UserId/UserId';
import { User } from './User';
import Profile from './Profile/Profile';
import Birthday from './Profile/Birthday';
import Day from './Profile/Birthday/Day';
import Year from './Profile/Birthday/Year';
import Month from './Profile/Birthday/Month';
import Website from './Profile/Website';
import UserLocation from './Profile/UserLocation';
import Bio from './Profile/Bio';
import UserImageURL from './Profile/UserImageURL';
import HeaderImageURL from './Profile/HeaderImageURL';
import UserName from './Profile/UserName';
import ScreenName from './Profile/ScreenName';
import { dateToString } from '../../utils/Util';
import { UserDataModel } from '../../infrastructure/UserDataModel';

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
  }: // follower,
  // following,
  UserPropsDetail): User {
    const profileProps = {
      screenName: new ScreenName(screenName),
      userName: new UserName(userName),
      headerImageURL: new HeaderImageURL(headerImageURL),
      userImageURL: new UserImageURL(userImageURL),
      bio: new Bio(bio),
      userLocation: new UserLocation(userLocation),
      website: new Website(website),
    };
    if (birthdayProp) {
      const birthdayString = dateToString(birthdayProp);
      const date = new Date(birthdayString);
      const year = new Year(date.getFullYear());
      const month = new Month(date.getMonth() + 1);
      const day = new Day(date.getDate());
      Object.assign(profileProps, {
        birthday: new Birthday({ year, month, day }),
      });
    }
    const profile = new Profile(profileProps);

    return new User({
      profile,
      followerCount,
      followingCount,
      tweetCount,
      userId: new UserId(userId),
    });
  }

  toDataModel(user: User): UserDataModel {
    return new UserDataModel(user);
  }
}
