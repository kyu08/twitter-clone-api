import * as Express from 'express';
import { FollowApplicationService } from '../application/FollowApplicationService';

const router = Express.Router();
const followApplicationService = new FollowApplicationService();

router.post('/', async (req, res) => {
  console.log('POST /follow called.');
  const { followingUserId, followerUserId } = req.body;
  if (followingUserId === undefined || followerUserId === undefined) {
    res.status(404);
    res.send('Not Found.');
  }
  followApplicationService.follow(followingUserId, followerUserId);
  res.send('followed.');
});

router.delete('/', async (req, res) => {
  console.log('DELETE /follow called.');
  const { followingUserId, followerUserId } = req.body;
  if (followingUserId === undefined || followerUserId === undefined) {
    res.status(404);
    res.send('Not Found.');
  }
  followApplicationService.unFollow(followingUserId, followerUserId);
  res.send('unFollowed.');
});

router.get('/', async (req, res) => {
  console.log('get /follow called.');
  const { followingUserId, followerUserId } = req.query;
  if (followingUserId === undefined || followerUserId === undefined) {
    res.status(404);
    res.send('Not Found.');
  }

  const followInfo = await followApplicationService
    .getFollowInfo(String(followingUserId), String(followerUserId))
    .catch((e) => {
      console.log(e);
    });
  // todo あまりよくない気はしている
  if (typeof followInfo === 'object') {
    res.send(followInfo);
    return;
  }
  res.status(404);
  res.send('Not Found.');
});

export default router;
