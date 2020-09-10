import { IUserRepository } from '../model/User/IUserRepository';
import UserRepository from '../infrastructure/UserRepository';
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

  async getFull(userId: string): Promise<UserDataModel | Error> {
    const userProps = await this.userRepository.getFull(userId).catch((e) => e);
    const user = this.userFactory.toInstance(userProps);
    return this.userFactory.toDataModel(user);
  }

  async getFullByScreenName(
    screenName: string,
  ): Promise<UserDataModel | Error> {
    const userProps = await this.userRepository
      .getFullByScreenName(screenName)
      .catch((e) => e);
    const user = this.userFactory.toInstance(userProps);
    return this.userFactory.toDataModel(user);
  }
}
