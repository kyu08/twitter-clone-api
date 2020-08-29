import { FollowRepository } from '../infrastructure/FollowRepository';

export class FollowApplicationService {
  readonly followRepository: FollowRepository;

  constructor() {
    this.followRepository = new FollowRepository();
  }

  follow(following_user_id: string, follower_user_id: string): void {
    if (
      this.followRepository.isFollowing(following_user_id, follower_user_id)
    ) {
      console.log(
        'you can not follow this user because you already follow this user.',
      );
      return;
    }
    this.followRepository.follow(following_user_id, follower_user_id);
  }

  unFollow(following_user_id: string, follower_user_id: string): void {
    if (
      !this.followRepository.isFollowing(following_user_id, follower_user_id)
    ) {
      console.log(
        'you can not unFollow this user because you are not following this user.',
      );
      return;
    }
    this.followRepository.unFollow(following_user_id, follower_user_id);
  }

  isFollowing(
    following_user_id: string,
    follower_user_id: string,
  ): Promise<boolean> {
    return this.followRepository.isFollowing(
      following_user_id,
      follower_user_id,
    );
  }
}
