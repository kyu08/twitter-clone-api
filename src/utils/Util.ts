export type TODO<T> = any;

// 2階層目まで undefined をチェック
export const ensurePropsContainsNoUndefined = <T>(props: T) => {
  const values = Object.values(props);
  if (values.includes(undefined)) {
    console.log(values);
    throw new Error('↑↑↑ this property contains undefined.');
  }
  values.forEach((value) => {
    if (!value) return;
    if (Object.values(value).includes(undefined)) {
      console.log(value);
      throw new Error('↑↑↑ this property contains undefined.');
    }
  });
};

export const dateToString = (date: Date): string => {
  return JSON.parse(JSON.stringify(date));
};
