// これは差し替えないやーつなのでインスタンス化せずに静的メソッドで書く
import { IUserRepository } from '../model/User/IUserRepository';
import { UserRepository } from '../repository/UserRepository';
import { ITweetRepository } from '../model/Tweet/ITweetRepository';
import TweetRepository from '../repository/TweetRepository';
// import { ITweetDataForUI } from '../model/TweetDataForUI/ITweetDataForUI';

export default class HomeApplicationService {
  static readonly userRepository: IUserRepository = new UserRepository();

  static readonly tweetRepository: ITweetRepository = new TweetRepository();

  static returnTimeline = (userId: number) => {
    // static returnTimeline = (): ITweetDataForUI => {
    return [{ userId }, { userId }];
  };
}
