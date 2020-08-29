import { FollowRepository } from '../infrastructure/FollowRepository';

export class FollowApplicationService {
  readonly followRepository: FollowRepository;

  constructor() {
    this.followRepository = new FollowRepository();
  }

  follow(following_user_id: string, follower_user_id: string): void {
    // todo if文判定式の中身が Promise<Pending>になっちゃうのでうまくいかない
    // issue page -> https://github.com/kyu08/twitter-clone-api/issues/49
    // console.log('↓ isFollowing @ApplicationService.follow');
    // console.log(
    //   this.followRepository.isFollowing(following_user_id, follower_user_id),
    // );
    // if (
    //   this.followRepository.isFollowing(following_user_id, follower_user_id)
    // ) {
    //   console.log(
    //     'you can not follow this user because you already follow this user.',
    //   );
    //   return;
    // }
    this.followRepository.follow(following_user_id, follower_user_id);
  }

  unFollow(following_user_id: string, follower_user_id: string): void {
    // todo if文判定式の中身が Promise<Pending>になっちゃうのでうまくいかない
    // issue page -> https://github.com/kyu08/twitter-clone-api/issues/49
    // console.log('↓ isFollowing @ApplicationService.unFollow');
    // console.log(
    //   this.followRepository.isFollowing(following_user_id, follower_user_id),
    // );
    // if (
    //   !this.followRepository.isFollowing(following_user_id, follower_user_id)
    // ) {
    //   console.log(
    //     'you can not unFollow this user because you are not following this user.',
    //   );
    //   return;
    // }
    this.followRepository.unFollow(following_user_id, follower_user_id);
  }

  isFollowing(
    following_user_id: string,
    follower_user_id: string,
  ): Promise<boolean | void> {
    return this.followRepository.isFollowing(
      following_user_id,
      follower_user_id,
    );
  }
}
