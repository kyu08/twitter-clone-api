import { IUserRepository } from '../model/User/IUserRepository';
import { TODO } from '../utils/Util';

export default class UserRepository implements IUserRepository {
  private static getUserDataFromDB(userId: string) {
    const screenNameInDB = 'kyuu08';
    const userImageURLInDB =
      'https://test-kyu08.s3-ap-northeast-1.amazonaws.com/userImage/default-user-image.png';
    const userNameInDB = 'kyuushima.com';

    return {
      screenName: screenNameInDB,
      userImageURL: userImageURLInDB,
      userName: userNameInDB,
    };
  }

  returnUserData(userId: string): TODO<'userDataForTweet'> {
    return UserRepository.getUserDataFromDB(userId);
  }
}
