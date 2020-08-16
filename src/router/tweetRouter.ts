import * as Express from 'express';
import * as pg from 'pg';
import { v4 as uuidv4 } from 'uuid';
import { QueryResult } from 'pg';
import { PGClientConfig } from '../repository/DBConfig';

const router = Express.Router();

router.post('/', (req, res) => {
  console.log('POST /tweet called');
  const client = new pg.Client(PGClientConfig);

  const { user_id, content } = req.body;
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
      client.end();
    })
    .catch((e: Error) => console.log(e));

  return res.send(req.body);
});

router.get('/:tweetId', (req, res) => {
  console.log('GET /tweet/:tweetId called');
  console.log(req.params);
  return res.send(req.params);
});

router.get('/:tweetId/likes', (req, res) => {
  console.log('GET /tweet/:tweetId/likes called');
  console.log(req.params);
  const hoge = ['taro', 'jiro'];
  return res.send(hoge);
});

router.get('/:tweetId/retweets', (req, res) => {
  console.log('GET /tweet/:tweetId/retweets called');
  console.log(req.params);
  const hoge = ['taro', 'jiro'];
  return res.send(`${hoge}RT`);
});

router.delete('/:tweetId', (req, res) => {
  console.log('DELETE /tweet/:tweetId called');
  console.log(req.params);
  return res.send(`DELETE -> ${req.params}`);
});

export default router;
