export interface ITweetDataForUI {
  readonly tweetId: string;
  readonly userImage: any;
  readonly userName: string;
  readonly screenName: string;
  readonly content: string;
  readonly likeCount: number;
  readonly replyCount: number;
  readonly retweetCount: number;
  readonly tweetedAt: Date;
}
