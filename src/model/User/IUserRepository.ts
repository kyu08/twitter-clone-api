// eslint-disable-next-line import/no-cycle
import { UserDataFull } from '../../repository/UserRepository';

export interface IUserRepository {
  // returnUserData(userId: string): Promise<UserDataForTweet>;
  returnUserData(userId: string): any;
  getFull(userId: string): Promise<UserDataFull>;
}
