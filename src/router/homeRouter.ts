import * as Express from 'express';
import HomeApplicationService from '../application/HomeApplicationService';

const router = Express.Router();

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const tweetDataForUI = await HomeApplicationService.returnTimeline(userId);
    res.send(JSON.stringify(tweetDataForUI));
  } catch (e) {
    console.log(e);
  }
});

export default router;
