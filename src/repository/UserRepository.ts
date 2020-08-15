import { IUserRepository } from '../model/User/IUserRepository';
import { TODO } from '../utils/Util';

export default class UserRepository implements IUserRepository {
  private static getUserDataFromDB(userId: string) {
    const screenNameInDB = 'kyuu08';
    const userImageURLInDB = 'hoge';
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
