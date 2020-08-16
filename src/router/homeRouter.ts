import * as Express from 'express';
import HomeApplicationService from '../application/HomeApplicationService';

const router = Express.Router();

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  return HomeApplicationService.returnTimeline(userId)
    .then((t) => {
      return JSON.stringify(t);
    })
    .then((resJSON) => {
      res.send(resJSON);
    })
    .catch((e: Error) => {
      console.log(e);
    });
});

export default router;
