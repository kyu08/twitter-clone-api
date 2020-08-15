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

  constructor(props: TweetProps) {
    const { content, tweetId, createdAt, userId } = props;
    this.content = content;
    this.tweetId = tweetId;
    this.createdAt = createdAt;
    this.userId = userId;
  }
}
