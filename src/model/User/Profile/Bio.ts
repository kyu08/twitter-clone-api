export const MAX_BIO_LENGTH = 150;

export default class Bio {
  readonly bio: string;

  constructor(bio: string) {
    if (bio.length > MAX_BIO_LENGTH)
      throw new Error('Bio Length Error!( > 20 )');
    this.bio = bio;
  }
}
