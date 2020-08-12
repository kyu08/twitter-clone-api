import * as Express from 'express';
// import { response } from 'express';
import HomeApplicationService from '../application/HomeApplicationService';

const router = Express.Router();

router.get('/:userId', (req, res) => {
  const { userId: userIdString } = req.params;
  // todo Nan 判定必要？
  const userId = Number(userIdString);
  HomeApplicationService.returnTimeline(userId)
    .then((t) => {
      return JSON.stringify(t);
    })
    .then((resJSON) => {
      res.send(resJSON);
    });
});

export default router;
