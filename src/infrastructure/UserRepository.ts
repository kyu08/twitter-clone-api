import * as pg from 'pg';
import { QueryResult } from 'pg';
// eslint-disable-next-line import/no-cycle
import { IUserRepository } from '../model/User/IUserRepository';
import { PGClientConfig } from './DBConfig';

type UserColumnsForTweet = {
  screen_name: string;
  user_name: string;
  user_image_url: string;
};

export type UserDataForTweet = {
  screenName: string;
  userImageURL: string;
  userName: string;
};

// todo user系の class に移動しよう
export type UserDataFull = {
  id: string;
  screen_name: string;
  user_name: string;
  header_image_url: string;
  user_image_url: string;
  bio: string;
  birthday: Date;
  user_location: string;
  website: string;
  created_at: Date;
  followingCount: number;
  followerCount: number;
  tweetCount: number;
};

export default class UserRepository implements IUserRepository {
  async getUserDataFromDB(userId: string): Promise<UserDataForTweet> {
    const client = new pg.Client(PGClientConfig);
    const query = {
      text:
        'select screen_name, user_name, user_image_url from users WHERE id=$1',
      values: [userId],
    };

    client.connect();
    const response: QueryResult<UserColumnsForTweet> = await client
      .query(query)
      .catch((e) => e);
    client.end();
    const {
      screen_name: screenName,
      user_name: userName,
      user_image_url: userImageURL,
    } = response.rows[0];
    return { screenName, userImageURL, userName };
  }

  // returnUserData(userId: string): Promise<UserDataForTweet> {

  async getFull(userId: string): Promise<UserDataFull> {
    const client = new pg.Client(PGClientConfig);
    const query = {
      text:
        'SELECT ' +
        'id, screen_name, user_name, header_image_url, user_image_url, bio, birthday, user_location, website, created_at ' +
        'FROM users WHERE id=$1',
      values: [userId],
    };

    // todo DBのデータにしよう tweetCount も渡す
    const countObject = {
      followerCount: 2,
      followingCount: 6,
      // todo あとでやる front 側で User, UserDataModel
      // tweetCount: 123,
    };

    client.connect();
    const response: QueryResult = await client.query(query).catch((e) => e);
    client.end();
    // null だと 1970/1/1 が入ってしまうので delete
    if (!response.rows[0].birthday) {
      delete response.rows[0].birthday;
    }
    return { ...response.rows[0], ...countObject };
  }

  async getFullByScreenName(screenName: string): Promise<UserDataFull> {
    const client = new pg.Client(PGClientConfig);
    const query = {
      text:
        'SELECT ' +
        'id, screen_name, user_name, header_image_url, user_image_url, bio, birthday, user_location, website, created_at ' +
        'FROM users WHERE screen_name=$1',
      values: [screenName],
    };

    // todo DBのデータにしよう
    const countObject = {
      followerCount: 2,
      followingCount: 6,
      // todo あとでやる front 側で User, UserDataModel
      // tweetCount: 123,
    };

    client.connect();
    const response: QueryResult = await client.query(query).catch((e) => e);
    client.end();
    // null だと 1970/1/1 が入ってしまうので delete
    if (!response.rows[0].birthday) {
      delete response.rows[0].birthday;
    }
    return { ...response.rows[0], ...countObject };
  }
}
