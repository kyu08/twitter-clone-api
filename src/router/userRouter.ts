import * as Express from 'express';
import { UserApplicationService } from '../application/UserApplicationService';

const router = Express.Router();
const userApplicationService = new UserApplicationService();

router.get('/userId/:userId/full', async (req, res) => {
  console.log('GET /user/userId/:userId/full called');
  const { userId } = req.params;
  const userData = await userApplicationService
    .getFull(userId)
    .catch((e) => console.log(e));
  res.send(userData);
});

router.get('/screenName/full', async (req, res) => {
  console.log('GET /user/:screenName/full called');
  const { screenName } = req.query;
  const userData = await userApplicationService
    .getFullByScreenName(String(screenName))
    .catch((e) => {
      res.status(404);
      res.send('Not Found.');
    });
  res.send(userData);
});

export default router;
