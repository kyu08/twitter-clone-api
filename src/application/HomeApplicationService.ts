import { IUserRepository } from '../model/User/IUserRepository';
import UserRepository from '../repository/UserRepository';
import { ITweetRepository } from '../model/Tweet/ITweetRepository';
import TweetRepository from '../repository/TweetRepository';
import { IFollowingRepository } from '../model/Following/IFollowingRepository';
import FollowingRepository from '../repository/FollowingRepository';
import TweetDataForUI from '../model/TweetDataForUI/TweetDataForUI';
import { ITweetDataForUI } from '../model/TweetDataForUI/ITweetDataForUI';

// これは差し替えないやーつなのでインスタンス化せずに静的メソッドで書く
export default class HomeApplicationService {
  static readonly userRepository: IUserRepository = new UserRepository();

  static readonly tweetRepository: ITweetRepository = new TweetRepository();

  static readonly followingRepository: IFollowingRepository = new FollowingRepository();

  static returnTimeline = (userId: number): ITweetDataForUI[] => {
    const followingUserId: number[] = HomeApplicationService.followingRepository.returnFollowingUserArray(
      userId,
    );
    const tweetArray = HomeApplicationService.tweetRepository.returnTweetArray(
      followingUserId,
      HomeApplicationService.tweetRepository,
    );

    return tweetArray.map((t) => {
      // const { userId: userIdOfTweet } = t;
      const { userId: userIdOfTweet, tweetId } = t;
      const userDataForTweet = HomeApplicationService.userRepository.returnUserData(
        userIdOfTweet,
      );
      const countArray = HomeApplicationService.tweetRepository.returnCountArray(
        tweetId,
      );
      const props = {
        ...t,
        ...userDataForTweet,
        ...countArray,
      };

      return new TweetDataForUI(props);
    });
  };
}
