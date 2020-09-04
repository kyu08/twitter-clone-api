import * as Express from 'express';
import HomeApplicationService from '../application/HomeApplicationService';

const router = Express.Router();
const homeApplicationService = new HomeApplicationService();

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const tweetDataModel = await homeApplicationService
    .returnTimeline(userId)
    .catch((e) => console.log(e));
  res.send(JSON.stringify(tweetDataModel));
});

export default router;
