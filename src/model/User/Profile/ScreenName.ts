export const MAX_SCREEN_NAME_LENGTH = 15;

export default class ScreenName {
  readonly screenName: string;

  // todo 半角文字のみにしたい
  constructor(screenName: string) {
    // todo 仕様として分離しよう()
    if (screenName.length > MAX_SCREEN_NAME_LENGTH)
      throw new Error('ScreenName Length Error!( > 10 )');
    this.screenName = screenName;
  }
}
