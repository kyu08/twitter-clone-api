import * as Express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import tweet from './router/tweet';

const app = Express();

// todo #3 これだとすべて許可になってるのでのちのち見直す
app.use(cors());
app.use(bodyParser.json());

// Router
app.use('/tweet', tweet);

app.get('/', (req: Express.Request, res: Express.Response) => {
  console.log('/ called');

  return res.send(JSON.stringify(['user1', 'user2']));
});

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
});

export default app;
