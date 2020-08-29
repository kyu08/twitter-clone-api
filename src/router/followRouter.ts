import * as Express from 'express';
import { FollowApplicationService } from '../application/FollowApplicationService';

const router = Express.Router();
const followApplicationService = new FollowApplicationService();

router.post('/', async (req, res) => {
  console.log('POST /follow called.');
  const { userIdFollowing, userIdFollower } = req.body;
  followApplicationService.follow(userIdFollowing, userIdFollower);
  // .catch((e) => {
  //   res.status(400);
  //   res.send('bad request.');
  // });
  res.send('followed.');
});

router.delete('/', async (req, res) => {
  console.log('DELETE /follow called.');
  const { userIdFollowing, userIdFollower } = req.body;
  followApplicationService.unFollow(userIdFollowing, userIdFollower);
  // .catch((e) => {
  //   res.status(400);
  //   res.send('bad request.');
  // });
  res.send('unFollowed.');
});

export default router;
