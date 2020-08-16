import * as Express from 'express';
import { UserApplicationService } from '../application/UserApplicationService';

const router = Express.Router();

router.get('/:userId/full', (req, res) => {
  console.log('GET /user/:userId/full called');
  const { userId } = req.params;
  UserApplicationService.getFull(userId)
    .then((userData) => res.send(userData))
    .catch((e: Error) => console.log(e));
});

export default router;
