import { TODO } from '../../utils/Util';
// eslint-disable-next-line import/no-cycle
import { UserDataFull } from '../../repository/UserRepository';

export interface IUserRepository {
  returnUserData(userId: string): TODO<'userDataForTweet'>;
  getFull(userId: string): Promise<UserDataFull>;
}
