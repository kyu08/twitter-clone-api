import * as Express from 'express';
import { TweetApplicationService } from '../application/TweetApplicationService';

const router = Express.Router();
const tweetApplicationService = new TweetApplicationService();

router.post('/', (req, res) => {
  console.log('POST /tweet called');
  const { user_id, content } = req.body;
  tweetApplicationService.post(user_id, content);

  return res.send(req.body);
});

router.get('/:tweetId', (req, res) => {
  console.log('GET /tweet/:tweetId called');
  return res.send(req.params);
});

router.get('/:tweetId/likes', (req, res) => {
  console.log('GET /tweet/:tweetId/likes called');
  const hoge = ['taro', 'jiro'];
  return res.send(hoge);
});

router.get('/:tweetId/retweets', (req, res) => {
  console.log('GET /tweet/:tweetId/retweets called');
  const hoge = ['taro', 'jiro'];
  return res.send(`${hoge}RT`);
});

router.delete('/:tweetId', (req, res) => {
  console.log('DELETE /tweet/:tweetId called');
  return res.send(`DELETE -> ${req.params}`);
});

export default router;
