import * as Express from 'express';

const app: any = Express();

app.get('/', (req: Express.Request, res: Express.Response) => {
  return res.send('ieeeeeeeeeeei');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
  console.log(11);
});

export default app;
