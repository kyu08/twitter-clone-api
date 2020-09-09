import * as pg from 'pg';
import { QueryResult } from 'pg';
import { PGClientConfig } from './DBConfig';

export class FollowRepository {
  follow(following_user_id: string, follower_user_id: string): void {
    const client = new pg.Client(PGClientConfig);
    const created_at = new Date();
    const query = {
      text: 'INSERT INTO user_relation VALUES($1, $2, $3)',
      values: [following_user_id, follower_user_id, created_at],
    };

    client.connect();
    client
      .query(query)
      .then((response: QueryResult) => {
        client.end();
      })
      .catch((e: Error) => console.log(e));
  }

  unFollow(following_user_id: string, follower_user_id: string): void {
    const client = new pg.Client(PGClientConfig);
    const query = {
      text:
        'DELETE FROM user_relation WHERE following_user_id = $1 AND follower_user_id = $2',
      values: [following_user_id, follower_user_id],
    };

    client.connect();
    client
      .query(query)
      .then((response: QueryResult) => {
        client.end();
      })
      .catch((e: Error) => console.log(e));
  }

  getIdByScreenName(screenName: string): Promise<string | Error> {
    const client = new pg.Client(PGClientConfig);
    const query = {
      text: 'SELECT id FROM users WHERE screen_name = $1',
      values: [screenName],
    };

    client.connect();
    return client
      .query(query)
      .then((response: QueryResult) => {
        client.end();
        const userId = response.rows[0].id;
        if (!userId) throw new Error('there is no user has this screenName.');
        console.log(userId);
        return userId;
      })
      .catch((e: Error) => e);
  }
}
