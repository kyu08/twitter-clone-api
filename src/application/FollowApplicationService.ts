import { FollowRepository } from '../infrastructure/FollowRepository';

export class FollowApplicationService {
  readonly followRepository: FollowRepository;

  constructor() {
    this.followRepository = new FollowRepository();
  }

  follow(following_user_id: string, follower_user_id: string): void {
    // todo isFollowing 判定はここでやる
    // if (this.followRepository.isFollowing) return;
    this.followRepository.follow(following_user_id, follower_user_id);
  }

  unFollow(following_user_id: string, follower_user_id: string): void {
    // todo isFollowing 判定はここでやる
    // if (!this.followRepository.isFollowing) return;
    this.followRepository.unFollow(following_user_id, follower_user_id);
  }
}
