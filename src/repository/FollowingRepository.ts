import { IFollowingRepository } from '../model/Following/IFollowingRepository';

export default class FollowingRepository implements IFollowingRepository {
  returnFollowingUserArray = (userId: number): any => {
    return [1, 2];
  };
}
