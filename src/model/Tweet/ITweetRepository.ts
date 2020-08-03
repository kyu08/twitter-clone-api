import Tweet from './Tweet';

export interface ITweetRepository {
  returnTweetArray(
    userIdArray: number[],
    tweetRepository: ITweetRepository,
  ): Tweet[];
}
