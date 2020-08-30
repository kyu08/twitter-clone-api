import * as Express from 'express';
import { UserApplicationService } from '../application/UserApplicationService';

const router = Express.Router();
const userApplicationService = new UserApplicationService();

router.get('/userId/:userId/full', async (req, res) => {
  console.log('GET /user/:userId/full called');
  const { userId } = req.params;
  const userData = await userApplicationService
    .getFull(userId)
    .catch((e) => console.log(e));
  res.send(userData);
});

router.get('/screenName/:screenName/full', async (req, res) => {
  console.log('GET /user/:screenName/full called');
  const { screenName } = req.params;
  const userData = await userApplicationService
    .getFullByScreenName(
      screenName,
      // todo レスポンスコード　かこう
      // https://expressjs.com/ja/guide/error-handling.html
      // たぶん↓でいける
      // res.status(500);
    )
    .catch((e) => console.log(e));
  res.send(userData);
});

export default router;
