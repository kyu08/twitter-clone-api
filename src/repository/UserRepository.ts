import { IUserRepository } from '../model/User/IUserRepository';

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

  returnUserData(userId: string): any {
    return UserRepository.getUserDataFromDB(userId);
  }
}
