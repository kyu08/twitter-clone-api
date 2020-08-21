import { IUserRepository } from '../model/User/IUserRepository';
import UserRepository from '../infrastructure/UserRepository';
import { ITweetRepository } from '../model/Tweet/ITweetRepository';
import TweetRepository from '../infrastructure/TweetRepository';
import { IFollowingRepository } from '../model/Following/IFollowingRepository';
import FollowingRepository from '../infrastructure/FollowingRepository';
import TweetDataModel, {
  TweetDataModelProps,
} from '../infrastructure/TweetDataModel';
import { ITweetDataModel } from '../infrastructure/ITweetDataModel';

// これは差し替えないやーつなのでインスタンス化せずに静的メソッドで書く
export default class HomeApplicationService {
  static readonly userRepository: IUserRepository = new UserRepository();

  static readonly tweetRepository: ITweetRepository = new TweetRepository();

  static readonly followingRepository: IFollowingRepository = new FollowingRepository();

  static returnTimeline = async (
    userId: string,
  ): Promise<ITweetDataModel[]> => {
    const followingUserId: string[] = HomeApplicationService.followingRepository.returnFollowingUserArray(
      userId,
    );
    const tweetArray = await HomeApplicationService.tweetRepository.returnTweetArray(
      followingUserId,
      HomeApplicationService.tweetRepository,
    );
    return Promise.all(
      tweetArray.map(async (tweet) => {
        const { userId: userIdOfTweet, tweetId } = tweet;
        const userData = await HomeApplicationService.userRepository.returnUserData(
          userIdOfTweet,
        );
        const countArray = HomeApplicationService.tweetRepository.returnCountArray(
          tweetId,
        );
        const props: TweetDataModelProps = {
          ...tweet,
          ...userData,
          ...countArray,
        };
        return new TweetDataModel(props);
      }),
    );
  };
}
