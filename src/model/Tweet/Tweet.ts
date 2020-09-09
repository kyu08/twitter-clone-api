import { ITweet } from './ITweet';

export interface TweetProps {
  tweetId: string;
  content: string;
  createdAt: Date;
  userId: string;
}

export default class Tweet implements ITweet {
  readonly tweetId: string;

  readonly content: string;

  readonly createdAt: Date;

  readonly userId: string;

  constructor({ content, tweetId, createdAt, userId }: TweetProps) {
    this.content = content;
    this.tweetId = tweetId;
    this.createdAt = createdAt;
    this.userId = userId;
  }
}
