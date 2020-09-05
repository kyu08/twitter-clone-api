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
  async getTweetArrayFromDB(currentUserId: string): Promise<TweetData[]> {
    const client = new pg.Client(PGClientConfig);
    const query = {
      text:
        // WITH で書くのもいいかも
        'SELECT * FROM tweets WHERE id IN ' +
        '(SELECT tweet_id FROM tweet_index WHERE user_id IN ' +
        '((SELECT follower_user_id from user_relation where following_user_id = $1), $1))',
      values: [currentUserId],
    };

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

  create(tweetProps: TweetProps): Tweet {
    return new Tweet(tweetProps);
  }

  returnCountArray(tweetId: string): CountObject {
    const replyCount = 30;
    const likeCount = 32;
    const retweetCount = 33;

    return { replyCount, likeCount, retweetCount };
  }

  // instance 化する
  async returnTweetArray(currentUserId: string): Promise<Tweet[]> {
    const tweetDataArray = await this.getTweetArrayFromDB(currentUserId).catch(
      (e) => e,
    );

    return tweetDataArray.map((tweetData: TweetData) => this.create(tweetData));
  }

  post(user_id: string, content: string): void {
    const client = new pg.Client(PGClientConfig);
    const tweet_id = uuidv4();
    const created_at = new Date();
    // todo ここ enum つくってmagic number をなくす
    const category_id = 1;
    const insertIntoTweetQuery = {
      text: 'INSERT INTO tweets VALUES($1, $2, $3, $4)',
      values: [tweet_id, user_id, content, created_at],
    };
    const insertIntoTweetIndexQuery = {
      text: 'INSERT INTO tweet_index VALUES($1, $2, $3, $4)',
      values: [tweet_id, user_id, category_id, created_at],
    };

    (async () => {
      // index table と tweet table 両方にいれるトランザクション
      try {
        await client.connect();
        await client.query('BEGIN');
        await client.query(insertIntoTweetQuery);
        await client.query(insertIntoTweetIndexQuery);
        await client.query('COMMIT');
        console.log(
          'insert to [tweet] table and [tweet_index] table successfully.',
        );
      } catch (e) {
        console.log(e);
      } finally {
        await client.end();
        console.log('client disconnected successfully.');
      }
    })();
  }
}
