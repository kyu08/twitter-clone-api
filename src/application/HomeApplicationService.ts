import { IUserRepository } from '../model/User/IUserRepository';
import UserRepository from '../repository/UserRepository';
import { ITweetRepository } from '../model/Tweet/ITweetRepository';
import TweetRepository from '../repository/TweetRepository';
import { IFollowingRepository } from '../model/Following/IFollowingRepository';
import FollowingRepository from '../repository/FollowingRepository';
import TweetDataForUI, {
  TweetDataForUIProps,
} from '../model/TweetDataForUI/TweetDataForUI';
import { ITweetDataForUI } from '../model/TweetDataForUI/ITweetDataForUI';

// これは差し替えないやーつなのでインスタンス化せずに静的メソッドで書く
export default class HomeApplicationService {
  static readonly userRepository: IUserRepository = new UserRepository();

  static readonly tweetRepository: ITweetRepository = new TweetRepository();

  static readonly followingRepository: IFollowingRepository = new FollowingRepository();

  static returnTimeline = async (
    userId: string,
  ): Promise<ITweetDataForUI[]> => {
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
        const props: TweetDataForUIProps = {
          ...tweet,
          ...userData,
          ...countArray,
        };
        return new TweetDataForUI(props);
      }),
    );
  };
}
