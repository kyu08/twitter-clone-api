import * as Express from 'express';
import * as pg from 'pg';
import { QueryResult } from 'pg';
import { PGClientConfig } from '../repository/DBConfig';

const router = Express.Router();

router.get('/', (req, res) => {
  console.log('GET /user called');
  const client = new pg.Client(PGClientConfig);
  const id = 'e15a1c26-9a65-4f89-91b0-99b2055ae26f';
  const query = {
    text:
      'SELECT ' +
      'id, screen_name, user_name, header_image_url, user_image_url, bio, birthday, user_location, website, created_at ' +
      'FROM users WHERE id=$1',
    values: [id],
  };

  client.connect();

  return client
    .query(query)
    .then((response: QueryResult<any>) => {
      client.end();
      return res.send(response.rows);
    })
    .catch((e: Error) => console.log(e));
});

export default router;
