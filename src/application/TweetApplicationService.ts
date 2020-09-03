import { ITweetRepository } from '../model/Tweet/ITweetRepository';
import TweetRepository from '../infrastructure/TweetRepository';

export class TweetApplicationService {
  readonly tweetRepository: ITweetRepository;

  constructor() {
    this.tweetRepository = new TweetRepository();
  }

  post(user_id: string, content: string): void {
    // todo domain model 使おう
    // const tweet = tweetFactory.create(user_id, content);
    // this.tweetRepository.post(tweet);
    this.tweetRepository.post(user_id, content);
  }
}
