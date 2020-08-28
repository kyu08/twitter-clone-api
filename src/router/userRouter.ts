import * as Express from 'express';
import { UserApplicationService } from '../application/UserApplicationService';

const router = Express.Router();

router.get('/:userId/full', async (req, res) => {
  console.log('GET /user/:userId/full called');
  const { userId } = req.params;
  const userData = await UserApplicationService.getFull(userId).catch((e) =>
    console.log(e),
  );
  res.send(userData);
});

router.get('/screenName/:screenName/full', async (req, res) => {
  console.log('GET /user/:screenName/full called');
  const { screenName } = req.params;
  const userData = await UserApplicationService.getFullByScreenName(
    screenName,
  ).catch((e) => console.log(e));
  res.send(userData);
});

export default router;
