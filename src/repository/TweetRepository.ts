import * as pg from 'pg';
import { QueryResult } from 'pg';
import { CountObject, ITweetRepository } from '../model/Tweet/ITweetRepository';
import Tweet, { TweetProps } from '../model/Tweet/Tweet';
import { PGClientConfig } from './DBConfig';
import { TODO } from '../utils/Util';

require('dotenv').config();

type TweetColumns = {
  id: string;
  user_id: string;
  content: string;
  created_at: TODO<'Date'>;
};

export default class TweetRepository implements ITweetRepository {
  // DBにアクセス
  static getTweetArrayFromDB(userIdArray: string[]): Promise<any[]> {
    const client = new pg.Client(PGClientConfig);
    const query = { text: 'select * from tweets' };

    client.connect();

    return client
      .query(query)
      .then((response: QueryResult<TweetColumns>) => {
        client.end();
        return response.rows.map((row) => {
          const { id, user_id, content, created_at } = row;
          return {
            tweetId: id,
            userId: user_id,
            content,
            createdAt: created_at,
          };
        });
      })
      .catch((e: Error) => {
        throw new Error(String(e));
      });
  }

  static create(tweetProps: TweetProps): Tweet {
    return new Tweet(tweetProps);
  }

  returnCountArray(tweetId: string): CountObject {
    const replyCount = 30;
    const likeCount = 32;
    const retweetCount = 33;

    return { replyCount, likeCount, retweetCount };
  }

  returnTweetArray(
    userIdArray: string[],
    tweetRepository: ITweetRepository,
  ): Promise<Tweet[]> {
    return TweetRepository.getTweetArrayFromDB(userIdArray)
      .then((t) => t.map((tt) => TweetRepository.create(tt)))
      .catch((e) => {
        throw new Error(String(e));
      });
  }
}
