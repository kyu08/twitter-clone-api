import * as pg from 'pg';
import { QueryResult } from 'pg';
import { CountObject, ITweetRepository } from '../model/Tweet/ITweetRepository';
import Tweet, { TweetProps } from '../model/Tweet/Tweet';
import { PGClientConfig } from './DBConfig';

require('dotenv').config();

export default class TweetRepository implements ITweetRepository {
  // DBにアクセス
  static getTweetArrayFromDB(userIdArray: number[]): Promise<TweetProps[]> {
    const client = new pg.Client(PGClientConfig);
    const query = { text: 'select * from tweets' };

    client.connect();

    return client
      .query(query)
      .then((response: QueryResult<TweetProps>) => {
        client.end();
        return response.rows;
      })
      .catch((e: Error) => {
        throw new Error(String(e));
      });
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
    tweetRepository: ITweetRepository,
  ): Promise<Tweet[]> {
    return TweetRepository.getTweetArrayFromDB(userIdArray)
      .then((t) => t.map((tt) => TweetRepository.create(tt)))
      .catch((e) => {
        throw new Error(String(e));
      });
  }
}
