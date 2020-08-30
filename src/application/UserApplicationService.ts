import { IUserRepository } from '../model/User/IUserRepository';
import UserRepository, { UserDataFull } from '../infrastructure/UserRepository';

export class UserApplicationService {
  readonly userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getFull(userId: string): Promise<UserDataFull> {
    return this.userRepository.getFull(userId);
    // const userInfo = await this.userRepository.getFull(
    //   userId,
    // );
    // const followInfo = await hoge;
    // return { ...userInfo, ...followInfo };
  }

  getFullByScreenName(screenName: string): Promise<UserDataFull> {
    return this.userRepository.getFullByScreenName(screenName);
  }
}
