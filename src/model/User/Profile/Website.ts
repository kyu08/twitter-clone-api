const MAX_WEBSITE_LENGTH = 30;

export default class Website {
  readonly website: string;

  constructor(website: string) {
    if (website.length > MAX_WEBSITE_LENGTH)
      throw new Error('Website Length Error!( > 30 )');
    this.website = website;
  }
}
