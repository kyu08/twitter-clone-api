export interface ITweetDataModel {
  readonly tweetId: string;
  readonly userImageURL: string;
  readonly userName: string;
  readonly screenName: string;
  readonly content: string;
  readonly likeCount: number;
  readonly replyCount: number;
  readonly retweetCount: number;
  readonly createdAt: Date;
}
