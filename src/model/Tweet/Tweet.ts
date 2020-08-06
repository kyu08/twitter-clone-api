import { ITweet } from './ITweet';

      export interface TweetProps {
  tweetId: number;
  content: string;
  tweetedAt: Date;
  userId: number;
}

export default class Tweet implements ITweet {
  readonly tweetId: number;

  readonly content: string;

  readonly tweetedAt: Date;

  readonly userId: number;

  constructor(props: TweetProps) {
    const { content, tweetId, tweetedAt, userId } = props;
    this.content = content;
    this.tweetId = tweetId;
    this.tweetedAt = tweetedAt;
    this.userId = userId;
  }
}
