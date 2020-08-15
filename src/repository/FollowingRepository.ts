import { IFollowingRepository } from '../model/Following/IFollowingRepository';

export default class FollowingRepository implements IFollowingRepository {
  returnFollowingUserArray = (userId: string): string[] => {
    return ['h', 'a'];
  };
}
