import { IUserRepository } from '../model/User/IUserRepository';

export default class UserRepository implements IUserRepository {
  private static getUserDataFromDB(userId: string) {
    const screenNameInDB = 'kyuu08';
    const userImageInDB = 'hoge';
    const userNameInDB = 'kyuushima.com';

    return {
      screenName: screenNameInDB,
      userImage: userImageInDB,
      userName: userNameInDB,
    };
  }

  returnUserData(userId: string): any {
    return UserRepository.getUserDataFromDB(userId);
  }
}
