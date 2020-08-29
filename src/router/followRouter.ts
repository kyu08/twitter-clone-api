import * as Express from 'express';
import { FollowApplicationService } from '../application/FollowApplicationService';

const router = Express.Router();
const followApplicationService = new FollowApplicationService();

router.post('/', async (req, res) => {
  console.log('POST /follow called.');
  const { followingUserId, followerUserId } = req.body;
  followApplicationService.follow(followingUserId, followerUserId);
  // .catch((e) => {
  //   res.status(400);
  //   res.send('bad request.');
  // });
  res.send('followed.');
});

router.delete('/', async (req, res) => {
  console.log('DELETE /follow called.');
  const { followingUserId, followerUserId } = req.body;
  followApplicationService.unFollow(followingUserId, followerUserId);
  // .catch((e) => {
  //   res.status(400);
  //   res.send('bad request.');
  // });
  res.send('unFollowed.');
});

router.get('/', async (req, res) => {
  console.log('get /follow called.');
  const { followingUserId, followerUserId } = req.query;
  const isFollowing = await followApplicationService
    .isFollowing(String(followingUserId), String(followerUserId))
    .catch((e) => e);
  // .catch((e) => {
  //   res.status(400);
  //   res.send('bad request.');
  // });
  res.send(isFollowing);
});

export default router;
