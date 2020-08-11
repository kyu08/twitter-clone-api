import * as pg from 'pg';
import { QueryResult } from 'pg';
import { CountObject, ITweetRepository } from '../model/Tweet/ITweetRepository';
import Tweet, { TweetProps } from '../model/Tweet/Tweet';

require('dotenv').config();

export default class TweetRepository implements ITweetRepository {
  // DBにアクセス
  static getTweetArrayFromDB(userIdArray: number[]): TweetProps[] {
    const client = new pg.Client({
      user: process.env.USER_NAME,
      host: process.env.HOST,
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      port: Number(process.env.PORT),
    });
    const query = { text: 'select * from test_table' };

    client.connect();

    client
      .query(query)
      .then((response: QueryResult<any>) => {
        console.log(response.rows[0]);
        client.end();
      })
      .catch((e: Error) => console.log(e));

    return [
      { tweetId: 101, content: 'haro', tweetedAt: new Date(), userId: 1 },
      { tweetId: 102, content: 'test', tweetedAt: new Date(), userId: 2 },
      { tweetId: 103, content: 'test', tweetedAt: new Date(), userId: 2 },
    ];
  }

  static create(tweetProps: TweetProps): Tweet {
    return new Tweet(tweetProps);
  }

  returnCountArray(tweetId: number): CountObject {
    const replyCount = 30;
    const likeCount = 32;
    const retweetCount = 33;

    return { replyCount, likeCount, retweetCount };
  }

  returnTweetArray(
    userIdArray: number[],
    // todo ↓いらなくない？
    tweetRepository: ITweetRepository,
  ): Tweet[] {
    const tweetProps = TweetRepository.getTweetArrayFromDB(userIdArray);
    const tweetArray = tweetProps.map((t) => TweetRepository.create(t));

    return tweetArray;
  }
}
