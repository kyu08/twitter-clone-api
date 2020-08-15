import { ITweetDataForUI } from './ITweetDataForUI';
import { ensurePropsContainsNoUndefined, TODO } from '../../utils/Util';

export interface TweetDataForUIProps {
  tweetId: string;
  screenName: string;
  createdAt: Date;
  content: string;
  likeCount: number;
  replyCount: number;
  retweetCount: number;
  userImageURL: TODO<'userImageURLURL'>;
  userName: string;
}

export default class TweetDataForUI implements ITweetDataForUI {
  readonly tweetId: string;

  readonly userImageURL: string;

  readonly userName: string;

  readonly screenName: string;

  readonly content: string;

  readonly likeCount: number;

  readonly replyCount: number;

  readonly retweetCount: number;

  readonly createdAt: Date;

  constructor(props: TweetDataForUIProps) {
    ensurePropsContainsNoUndefined<TweetDataForUIProps>(props);
    const {
      likeCount,
      replyCount,
      retweetCount,
      screenName,
      content,
      tweetId,
      createdAt,
      userImageURL,
      userName,
    } = props;

    this.likeCount = likeCount;
    this.replyCount = replyCount;
    this.retweetCount = retweetCount;
    this.content = content;
    this.screenName = screenName;
    this.tweetId = tweetId;
    this.createdAt = createdAt;
    this.userImageURL = userImageURL;
    this.userName = userName;
  }
}
