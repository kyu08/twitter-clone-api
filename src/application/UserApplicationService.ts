import { IUserRepository } from '../model/User/IUserRepository';
import UserRepository, { UserDataFull } from '../infrastructure/UserRepository';
import { FollowRepository } from '../infrastructure/FollowRepository';
import { UserFactory } from '../model/User/UserFactory';
import { UserDataModel } from '../infrastructure/UserDataModel';

export class UserApplicationService {
  readonly userRepository: IUserRepository;

  readonly followRepository: FollowRepository;

  readonly userFactory: UserFactory;

  constructor() {
    this.userRepository = new UserRepository();
    this.followRepository = new FollowRepository();
    this.userFactory = new UserFactory();
  }

  // todo currentUserId はないかもしれないから optional にいずれしよう(ログインしてない人が profile を見たいときとか)
  async getFull(userId: string): Promise<UserDataFull> {
    return this.userRepository.getFull(userId);
  }

  // followInfo も merge して返す
  async getFullByScreenName(
    screenName: string,
  ): Promise<UserDataModel | Error> {
    // async getFullByScreenName(screenName: string): Promise<UserDataFull | Error> {
    console.log(UserDataModel);
    const userProps = await this.userRepository.getFullByScreenName(screenName);
    const user = this.userFactory.toInstance(userProps);
    return this.userFactory.toDataModel(user);
    // return this.userRepository.getFullByScreenName(screenName);
    // todo followInfo もここでかえしていく
  }
}
