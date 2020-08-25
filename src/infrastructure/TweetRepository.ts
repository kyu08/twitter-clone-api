import * as pg from 'pg';
import { QueryResult } from 'pg';
import { v4 as uuidv4 } from 'uuid';
import { CountObject, ITweetRepository } from '../model/Tweet/ITweetRepository';
import Tweet, { TweetProps } from '../model/Tweet/Tweet';
import { PGClientConfig } from './DBConfig';

type TweetColumns = {
  id: string;
  user_id: string;
  content: string;
  created_at: Date;
};

type TweetData = {
  tweetId: string;
  userId: string;
  content: string;
  createdAt: Date;
};
export default class TweetRepository implements ITweetRepository {
  static async getTweetArrayFromDB(
    userIdArray: string[],
  ): Promise<TweetData[]> {
    const client = new pg.Client(PGClientConfig);
    const query = { text: 'select * from tweets' };

    client.connect();
    const response: QueryResult<TweetColumns> = await client.query(query);
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

  async returnTweetArray(
    userIdArray: string[],
    tweetRepository: ITweetRepository,
  ): Promise<Tweet[]> {
    const tweetDataArray = await TweetRepository.getTweetArrayFromDB(
      userIdArray,
    ).catch((e) => e);

    return tweetDataArray.map((tweetData: TweetData) =>
      TweetRepository.create(tweetData),
    );
  }

  post(user_id: string, content: string): void {
    const client = new pg.Client(PGClientConfig);
    const id = uuidv4();
    const created_at = new Date();
    const query = {
      text: 'INSERT INTO tweets VALUES($1, $2, $3, $4)',
      values: [id, user_id, content, created_at],
    };

    client.connect();
    client
      .query(query)
      .then((response: QueryResult<any>) => {
        console.log(response);
        client.end();
      })
      .catch((e: Error) => console.log(e));
  }
}
