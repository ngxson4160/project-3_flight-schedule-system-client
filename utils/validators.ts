export const validateEditor = (
  rule: any,
  value: string,
  callback: Function,
) => {
  const REMOVE_TAG_REGEX = /<\/?[^>]+>/gi;

  const valueWithoutTag = value.replace(REMOVE_TAG_REGEX, '');

  if (!valueWithoutTag) {
    return callback(new Error('Please enter text'));
  }

  callback();
};
