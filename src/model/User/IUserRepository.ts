import { UserDataForTweet, UserDataFull } from './User';

export interface IUserRepository {
  getUserDataFromDB(userId: string): Promise<UserDataForTweet>;
  getFull(userId: string): Promise<UserDataFull>;
  getFullByScreenName(screenName: string): Promise<UserDataFull>;
}
