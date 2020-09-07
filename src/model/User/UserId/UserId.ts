export default class UserId {
  readonly userId: string;

  constructor(userId: string) {
    if (userId.length !== 36) throw new Error('userId is invalid.');
    this.userId = userId;
  }
}
