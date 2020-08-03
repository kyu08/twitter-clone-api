export interface ITweetDataForUI {
  readonly tweetId: number;
  // todo 画像どう扱おう
  readonly userImage: any;
  readonly userName: string;
  readonly screenName: string;
  readonly content: string;
  readonly likeCount: number;
  readonly replyCount: number;
  readonly retweetCount: number;
  readonly tweetedAt: Date;
}
