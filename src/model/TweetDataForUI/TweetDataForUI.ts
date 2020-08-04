import { ITweetDataForUI } from './ITweetDataForUI';
import { TODO } from '../../utils/Util';

export interface TweetDataForUIProps {
  tweetId: number;
  screenName: string;
  tweetedAt: Date;
  content: string;
  likeCount: number;
  replyCount: number;
  retweetCount: number;
  userImage: TODO<'userImageURL'>;
  userName: string;
}

export default class TweetDataForUI implements ITweetDataForUI {
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

  constructor(props: TweetDataForUIProps) {
    const {
      likeCount,
      replyCount,
      retweetCount,
      screenName,
      content,
      tweetId,
      tweetedAt,
      userImage,
      userName,
    } = props;
    for (const prop of Object.keys(props)) {
      // todo ここから

      console.log(props[prop]);
      // if (props[prop] === undefined)
      //   throw new Error('some properties is undefined.');
    }

    this.likeCount = likeCount;
    this.replyCount = replyCount;
    this.retweetCount = retweetCount;
    this.content = content;
    this.screenName = screenName;
    this.tweetId = tweetId;
    this.tweetedAt = tweetedAt;
    this.userImage = userImage;
    this.userName = userName;
  }
}
