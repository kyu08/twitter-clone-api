import { CountObject, ITweetRepository } from '../model/Tweet/ITweetRepository';
import Tweet, { TweetProps } from '../model/Tweet/Tweet';

export default class TweetRepository implements ITweetRepository {
  // DBにアクセス
  static getTweetArrayFromDB(userIdArray: number[]): TweetProps[] {
    return [
      { tweetId: 101, content: 'haro', tweetedAt: new Date(), userId: 1 },
      { tweetId: 102, content: 'test', tweetedAt: new Date(), userId: 2 },
      { tweetId: 103, content: 'test', tweetedAt: new Date(), userId: 2 },
    ];
  }

  static create(tweetProps: TweetProps): Tweet {
    return new Tweet(tweetProps);
  }

  returnCountArray(tweetId: number): CountObject {
    const replyCount = 30;
    const likeCount = 32;
    const retweetCount = 33;

    return { replyCount, likeCount, retweetCount };
  }

  returnTweetArray(
    userIdArray: number[],
    // todo ↓いらなくない？
    tweetRepository: ITweetRepository,
  ): Tweet[] {
    const tweetProps = TweetRepository.getTweetArrayFromDB(userIdArray);
    const tweetArray = tweetProps.map((t) => TweetRepository.create(t));

    return tweetArray;
  }
}
