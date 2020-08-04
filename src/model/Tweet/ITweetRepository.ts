import Tweet from './Tweet';

export interface CountObject {
  replyCount: number;
  likeCount: number;
  retweetCount: number;
}

export interface ITweetRepository {
  returnTweetArray(
    userIdArray: number[],
    tweetRepository: ITweetRepository,
  ): Tweet[];
  returnCountArray(tweetId: number): CountObject;
}
