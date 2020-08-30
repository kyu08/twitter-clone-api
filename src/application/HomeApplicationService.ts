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

export default class HomeApplicationService {
  readonly userRepository: IUserRepository;

  readonly tweetRepository: ITweetRepository;

  readonly followingRepository: IFollowingRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.tweetRepository = new TweetRepository();
    this.followingRepository = new FollowingRepository();
  }

  returnTimeline = async (userId: string): Promise<ITweetDataModel[]> => {
    const followingUserId: string[] = this.followingRepository.returnFollowingUserArray(
      userId,
    );
    const tweetArray = await this.tweetRepository.returnTweetArray(
      followingUserId,
      this.tweetRepository,
    );
    return Promise.all(
      tweetArray.map(async (tweet) => {
        const { userId: userIdOfTweet, tweetId } = tweet;
        const userData = await this.userRepository.getUserDataFromDB(
          userIdOfTweet,
        );
        const countArray = this.tweetRepository.returnCountArray(tweetId);
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
