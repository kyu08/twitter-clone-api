import * as pg from 'pg';
import { QueryResult } from 'pg';
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

export default class UserRepository implements IUserRepository {
  private static getUserDataFromDB(userId: string): Promise<any> {
    const client = new pg.Client(PGClientConfig);
    const query = {
      text:
        'select screen_name, user_name, user_image_url from users WHERE id=$1',
      values: [userId],
    };

    client.connect();

    return client
      .query(query)
      .then((response: QueryResult<UserColumnsForTweet>) => {
        client.end();
        const {
          screen_name: screenName,
          user_name: userName,
          user_image_url: userImageURL,
        } = response.rows[0];
        return {
          screenName,
          userImageURL,
          userName,
        };
      })
      .catch((e: Error) => {
        throw new Error(String(e));
      });
  }

  returnUserData(userId: string): Promise<UserDataForTweet> {
    return UserRepository.getUserDataFromDB(userId);
  }
}
