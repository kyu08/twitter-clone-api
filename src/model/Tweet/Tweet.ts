import { ITweet } from './ITweet';

export interface TweetProps {
  tweetId: string;
  content: string;
  tweetedAt: Date;
  userId: string;
}

export default class Tweet implements ITweet {
  readonly tweetId: string;

  readonly content: string;

  readonly tweetedAt: Date;

  readonly userId: string;

  constructor(props: TweetProps) {
    const { content, tweetId, tweetedAt, userId } = props;
    this.content = content;
    this.tweetId = tweetId;
    this.tweetedAt = tweetedAt;
    this.userId = userId;
  }
}
