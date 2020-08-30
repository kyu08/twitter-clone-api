import { ITweetRepository } from '../model/Tweet/ITweetRepository';
import TweetRepository from '../infrastructure/TweetRepository';

export class TweetApplicationService {
  readonly tweetRepository: ITweetRepository;

  constructor() {
    this.tweetRepository = new TweetRepository();
  }

  post(user_id: string, content: string): void {
    this.tweetRepository.post(user_id, content);
  }
}
