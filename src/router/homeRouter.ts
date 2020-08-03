import * as Express from 'express';
import HomeApplicationService from '../application/HomeApplicationService';

const router = Express.Router();

router.get('/:userId', (req, res) => {
  const { userId: userIdString } = req.params;
  const userId = Number(userIdString);
  // todo Nan 判定必要？
  const tweetArray = HomeApplicationService.returnTimeline(userId);
  const tweetArrayJSON = JSON.stringify(tweetArray);
  console.log(tweetArrayJSON);

  res.send(tweetArrayJSON);
});

export default router;
