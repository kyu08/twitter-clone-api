import * as Express from 'express';

const app = Express();

app.get('/', (req: Express.Request, res: Express.Response) => {
  console.log('/ called');

  return res.send(JSON.stringify({ a: 'this is json.' }));
});

app.listen(3001, () => {
  console.log('Example app listening on port 3000!');
  console.log('11');
});

export default app;
