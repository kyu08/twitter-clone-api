import { ITweetRepository } from '../model/Tweet/ITweetRepository';
import TweetRepository from '../infrastructure/TweetRepository';

export class TweetApplicationService {
  static readonly tweetRepository: ITweetRepository = new TweetRepository();

  static post(user_id: string, content: string): void {
    TweetApplicationService.tweetRepository.post(user_id, content);
  }
}
