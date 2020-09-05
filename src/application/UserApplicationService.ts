import { IUserRepository } from '../model/User/IUserRepository';
import UserRepository, { UserDataFull } from '../infrastructure/UserRepository';
import { FollowRepository } from '../infrastructure/FollowRepository';

export class UserApplicationService {
  readonly userRepository: IUserRepository;

  readonly followRepository: FollowRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.followRepository = new FollowRepository();
  }

  // todo currentUserId はないかもしれないから optional にいずれしよう(ログインしてない人が profile を見たいときとか)
  async getFull(userId: string): Promise<UserDataFull> {
    return this.userRepository.getFull(userId);
  }

  // followInfo も merge して返す
  async getFullByScreenName(
    screenName: string,
    currentUserId: string,
  ): Promise<UserDataFull | Error> {
    return this.userRepository.getFullByScreenName(screenName);
    // todo followInfo もここでかえしていく
    // const indicatingUserId = await this.followRepository.getIdByScreenName(
    //   screenName,
    // );
    // if (indicatingUserId instanceof Error) return indicatingUserId;
    //
    // const userInfo = await this.userRepository.getFull(indicatingUserId);
    // const followInfo = await this.followRepository.getFollowInfo(
    //   currentUserId,
    //   indicatingUserId,
    // );
    //
    // if (userInfo instanceof Error) return userInfo;
    // if (followInfo instanceof Error) return followInfo;
    //
    // // todo domain model 使おう
    // // return this.userFactory.createUserFullDataModel(userInfo, followInfo);
    // // router で .build()して利用する?
    // return { ...userInfo, ...followInfo };
  }
}
