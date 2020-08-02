import * as Express from 'express';

const router = Express.Router();

router.post('/', (req, res) => {
  console.log('POST /tweet called');
  console.log(req.body);
  return res.send(req.body);
});

router.get('/:tweetId', (req, res) => {
  console.log('GET /tweet/:tweetId called');
  console.log(req.params);
  return res.send(req.params);
});

export default router;
