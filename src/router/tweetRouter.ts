import * as Express from 'express';
import { TweetApplicationService } from '../application/TweetApplicationService';

const router = Express.Router();

router.post('/', (req, res) => {
  console.log('POST /tweet called');
  const { user_id, content } = req.body;
  TweetApplicationService.post(user_id, content);

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
