import * as pg from 'pg';
import { QueryResult } from 'pg';
import { IUserRepository } from '../model/User/IUserRepository';
import { PGClientConfig } from './DBConfig';
import { UserDataForTweet, UserDataFull } from '../model/User/User';

type UserColumnsForTweet = {
  screen_name: string;
  user_name: string;
  user_image_url: string;
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

  async getFull(userId: string): Promise<UserDataFull> {
    const client = new pg.Client(PGClientConfig);
    const selectUserQuery = {
      text:
        'SELECT ' +
        'id, screen_name, user_name, header_image_url, user_image_url, bio, birthday, user_location, website, created_at ' +
        'FROM users WHERE id=$1',
      values: [userId],
    };

    const selectFollowingUserIdQuery = {
      text:
        'SELECT follower_user_id FROM user_relation WHERE following_user_id = $1',
      values: [userId],
    };
    const selectFollowerUserIdQuery = {
      text:
        'SELECT following_user_id FROM user_relation WHERE follower_user_id = $1',
      values: [userId],
    };
    const selectTweetCountQuery = {
      text: 'SELECT COUNT(tweet_id) FROM tweet_index WHERE user_id = $1',
      values: [userId],
    };

    await client.connect();
    const userResponse: QueryResult = await client
      .query(selectUserQuery)
      .catch((e) => e);
    const followingResponse: QueryResult = await client
      .query(selectFollowingUserIdQuery)
      .catch((e) => e);
    const followerResponse: QueryResult = await client
      .query(selectFollowerUserIdQuery)
      .catch((e) => e);
    const tweetCountResponse: QueryResult = await client
      .query(selectTweetCountQuery)
      .catch((e) => e);
    await client.end();
    // null だと 1970/1/1 が入ってしまうので delete
    if (!userResponse.rows[0].birthday) {
      delete userResponse.rows[0].birthday;
    }
    const followerUserIdArray = followerResponse.rows.map((object) => {
      if (!object) return;
      return object.following_user_id;
    });

    const followingUserIdArray = followingResponse.rows.map((object) => {
      if (!object) return;
      return object.follower_user_id;
    });
    const tweetCount = tweetCountResponse.rows[0].count;
    const countObject = {
      tweetCount,
    };
    const followObject = {
      follower: followerUserIdArray,
      following: followingUserIdArray,
    };
    return { ...userResponse.rows[0], ...countObject, ...followObject };
  }

  async getFullByScreenName(screenName: string): Promise<UserDataFull> {
    const client = new pg.Client(PGClientConfig);
    const query = {
      text: 'SELECT id FROM users WHERE screen_name = $1',
      values: [screenName],
    };

    await client.connect();
    const res = await client.query(query).catch((e) => e);
    await client.end();
    if (res.rowCount === 0 || res instanceof Error)
      throw new Error('there is no user has this screenName.');
    const userId = res.rows[0].id;
    return this.getFull(userId);
  }
}
