import { TODO } from '../../utils/Util';

export interface IUserRepository {
  returnUserData(userId: string): TODO<'userDataForTweet'>;
}
