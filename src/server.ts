import * as Express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import * as pg from 'pg';
import { QueryResult } from 'pg';
import tweet from './router/tweetRouter';
import home from './router/homeRouter';

const app = Express();

// todo #3 これだとすべて許可になってるのでのちのち見直す
app.use(cors());
app.use(bodyParser.json());

// Router
app.use('/tweet', tweet);
app.use('/home', home);

app.get('/', (req: Express.Request, res: Express.Response) => {
  console.log('/ called');
  const uuid = uuidv4();
  console.log(uuid);

  return res.send(uuid);
});

app.post('/db', (req: Express.Request, res: Express.Response) => {
  console.log('/db called');
  const client = new pg.Client({
    user: 'kyu08',
    host: '127.0.0.1',
    database: 'twitter-clone',
    password: '',
    port: 5432,
  });
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
    .then((response: QueryResult<any>) => console.log(response.rows[0]))
    .catch((e: Error) => console.log(e));

  return res.send('hoge');
});

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
});

export default app;
