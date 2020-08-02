import * as Express from 'express';

const router = Express.Router();

router.post('/', (req, res) => {
  console.log('POST /tweet called');
  console.log(req.body);
  return res.send(req.body);
});

export default router;
