import { IFollowingRepository } from '../model/Following/IFollowingRepository';

export default class FollowingRepository implements IFollowingRepository {
  returnFollowingUserArray = (userId: string): any => {
    return [1, 2];
  };
}
