import Bio from './Bio';
import UserLocation from './UserLocation';
import ScreenName from './ScreenName';
import UserName from './UserName';
import Website from './Website';
import UserImageURL from './UserImageURL';
import HeaderImageURL from './HeaderImageURL';
import Birthday from './Birthday';

interface ProfileProps {
  readonly screenName: ScreenName;
  readonly userName: UserName;
  readonly headerImageURL: HeaderImageURL;
  readonly userImageURL: UserImageURL;
  readonly bio: Bio;
  readonly birthday: Birthday;
  readonly userLocation: UserLocation;
  readonly website: Website;
}

// note UserImageURL, birthday optional にするかも
export default class Profile {
  readonly screenName: ScreenName;

  readonly userName: UserName;

  readonly headerImageURL: HeaderImageURL;

  readonly userImageURL: UserImageURL;

  readonly bio: Bio;

  readonly birthday: Birthday;

  readonly userLocation: UserLocation;

  readonly website: Website;

  constructor({
    screenName,
    userName,
    headerImageURL,
    userImageURL,
    bio,
    birthday,
    userLocation,
    website,
  }: ProfileProps) {
    this.userName = userName;
    this.screenName = screenName;
    this.headerImageURL = headerImageURL;
    this.userImageURL = userImageURL;
    this.bio = bio;
    this.birthday = birthday;
    this.userLocation = userLocation;
    this.website = website;
  }
}
