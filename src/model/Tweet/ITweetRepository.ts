import Tweet from './Tweet';

export interface CountObject {
  replyCount: number;
  likeCount: number;
  retweetCount: number;
}

export interface ITweetRepository {
  returnTweetArray(currentUserId: string): Promise<Tweet[]>;
  returnCountArray(tweetId: string): CountObject;
  post(user_id: string, content: string): void;
}
