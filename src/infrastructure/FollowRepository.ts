import * as pg from 'pg';
import { QueryResult } from 'pg';
import { PGClientConfig } from './DBConfig';

// todo たぶんここに書くのは適切でない。なんならFollowInfo 自体 instance 化する必要あるかもしれない
export type FollowInfo = {
  isFollowing: boolean;
  isFollowed: boolean;
};

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
        console.log(response);
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
        console.log(response);
        client.end();
      })
      .catch((e: Error) => console.log(e));
  }

  getFollowInfo(
    following_user_id: string,
    follower_user_id: string,
  ): Promise<FollowInfo | void> {
    const client = new pg.Client(PGClientConfig);
    const query = {
      text:
        'SELECT * FROM user_relation WHERE (following_user_id = $1 AND follower_user_id = $2) OR (following_user_id = $2 AND follower_user_id = $1)',
      values: [following_user_id, follower_user_id],
    };

    client.connect();
    return client
      .query(query)
      .then((response: QueryResult) => {
        client.end();
        console.log(response.rows);
        const res = response.rows;
        const isFollowing =
          res[0].following_user_id === following_user_id ||
          res[1].following_user_id === following_user_id;
        const isFollowed =
          res[0].follower_user_id === follower_user_id ||
          res[1].follower_user_id === follower_user_id;
        return { isFollowing, isFollowed };
      })
      .catch((e: Error) => console.log(e));
  }
}
