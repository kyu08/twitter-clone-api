// eslint-disable-next-line import/no-cycle
import {
  UserDataForTweet,
  UserDataFull,
} from '../../infrastructure/UserRepository';

export interface IUserRepository {
  getUserDataFromDB(userId: string): Promise<UserDataForTweet>;
  getFull(userId: string): Promise<UserDataFull>;
  getFullByScreenName(screenName: string): Promise<UserDataFull>;
}
