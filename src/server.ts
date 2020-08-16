import * as Express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import tweet from './router/tweetRouter';
import home from './router/homeRouter';
import user from './router/userRouter';

const app = Express();

// todo #3 これだとすべて許可になってるのでのちのち見直す
app.use(cors());
app.use(bodyParser.json());

// Router
app.use('/tweet', tweet);
app.use('/home', home);
app.use('/user', user);

app.get('/', (req: Express.Request, res: Express.Response) => {
  console.log('/ called');
  const uuid = uuidv4();

  return res.send(uuid);
});

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
});

export default app;
