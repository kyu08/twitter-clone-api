import * as Express from 'express';
import { UserApplicationService } from '../application/UserApplicationService';

const router = Express.Router();

router.get('/:userId/full', async (req, res) => {
  console.log('GET /user/:userId/full called');
  const { userId } = req.params;
  try {
    const userData = await UserApplicationService.getFull(userId);
    res.send(userData);
  } catch (e) {
    console.log(e);
  }
});

export default router;
