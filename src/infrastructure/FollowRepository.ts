import * as pg from 'pg';
import { PGClientConfig } from './DBConfig';

export class FollowRepository {
  follow(following_user_id: string, follower_user_id: string): void {
    const client = new pg.Client(PGClientConfig);
    const created_at = new Date();
    const query = {
      text: 'INSERT INTO user_relation VALUES($1, $2, $3)',
      values: [following_user_id, follower_user_id, created_at],
    };
    (async () => {
      await client.connect();
      await client.query(query).catch((e: Error) => console.log(e));
      await client.end();
    })();
  }

  unFollow(following_user_id: string, follower_user_id: string): void {
    const client = new pg.Client(PGClientConfig);
    const query = {
      text:
        'DELETE FROM user_relation WHERE following_user_id = $1 AND follower_user_id = $2',
      values: [following_user_id, follower_user_id],
    };
    (async () => {
      await client.connect();
      await client.query(query).catch((e: Error) => console.log(e));
      await client.end();
    })();
  }
}
