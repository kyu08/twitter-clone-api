import { IUserRepository } from '../model/User/IUserRepository';
import UserRepository from '../infrastructure/UserRepository';
import { ITweetRepository } from '../model/Tweet/ITweetRepository';
import TweetRepository from '../infrastructure/TweetRepository';
import TweetDataModel, {
  TweetDataModelProps,
} from '../infrastructure/TweetDataModel';
import { ITweetDataModel } from '../infrastructure/ITweetDataModel';
import { ITweet } from '../model/Tweet/ITweet';

export default class HomeApplicationService {
  readonly userRepository: IUserRepository;

  readonly tweetRepository: ITweetRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.tweetRepository = new TweetRepository();
  }

  returnTimeline = async (userId: string): Promise<ITweetDataModel[]> => {
    const tweetArray = await this.tweetRepository
      .returnTweetArray(userId)
      .catch((e) => e);
    return Promise.all(
      tweetArray.map(async (tweet: ITweet) => {
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

        // todo これ factory でやる DTO の生成って本当に factory でいいんだっけ？(単純にわからない)
        return new TweetDataModel(props);
      }),
    );
  };
}
