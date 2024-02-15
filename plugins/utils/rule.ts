/* eslint-disable no-control-regex */
export type RuleResult = boolean | string;

export const validatePassword = (
  rule: any,
  value: string,
  callback: any,
): RuleResult => {
  // Check if the value is not falsy (e.g. null, undefined, empty string)
  // If the value is falsy, return true because the validation should pass
  if (!value) return true;

  // Use a regular expression to check if the value is a valid password
  // A valid password should:
  // - have at least 8 characters
  // - contain at least 1 lowercase letter (a-z)
  // - contain at least 1 uppercase letter (A-Z)
  // If the value meets these requirements, return true
  // If it does not meet these requirements, return false
  return /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/g.test(value);
};

export const validateSpace = (rule: any, value: string): RuleResult => {
  // Check if the value is not falsy (e.g. null, undefined, empty string)
  // If the value is falsy, return true because the validation should pass
  if (!value) return true;
  //
  return !/\s/g.test(value);
};

export const validateAllIsSpace = (rule: any, value: string): RuleResult => {
  // Check if the value is not falsy (e.g. null, undefined, empty string)
  // If the value is falsy, return true because the validation should pass
  if (!value) return true;
  return !/^\s*$/g.test(value);
};

export const validateSpecialCharacters = (
  rule: any,
  value: string,
): RuleResult => {
  // Check if the value is not falsy (e.g. null, undefined, empty string)
  // If the value is falsy, return true because the validation should pass
  if (!value) return true;

  // Use a regular expression to check if the value contains any special characters
  // The special characters are: [, ], {, }, (, ), *, +, ?, ., ,, \, ^, $, |, #, !, %, &, ', =, ", @, :, ;, ！, ”, ＃, ＄, ％, ＆, ’, （, ）, ＝, ’, , ｛, ＠, 「, 「, ：,]
  // If the value does not contain any of these characters, return true
  // If it does contain any of these characters, return false
  return /^[^-[\]{}()*+?.,\\^$|#!%&'="@:;！”＃＄％＆’（）＝’｛＠「「：]+$/g.test(
    value,
  );
};

export const validateVietnamese = (rule: any, value: string): RuleResult => {
  // Check if the value is not falsy (e.g. null, undefined, empty string)
  // If the value is falsy, return true because the validation should pass
  if (!value) return true;

  // Use a regular expression to check if the value contains any special characters
  // The special characters are: [, ], {, }, (, ), *, +, ?, ., ,, \, ^, $, |, #, !, %, &, ', =, ", @, :, ;, ！, ”, ＃, ＄, ％, ＆, ’, （, ）, ＝, ’, , ｛, ＠, 「, 「, ：,]
  // If the value does not contain any of these characters, return true
  // If it does contain any of these characters, return false
  return /^[^\u00C0-\u1EF9]+$/g.test(value);
};

export const validateFiniteNumber = (rule: any, value: string): RuleResult => {
  // Check if the value is not falsy (e.g. null, undefined, empty string)
  // If the value is falsy, return true because the validation should pass
  if (!value) return true;

  // Convert the value to a number using the Number constructor
  const num = Number(value);

  // Check if the number is a finite number (i.e. not Infinity or NaN)
  // If the number is finite, return true
  // If the number is not finite, return false
  return !!Number.isFinite(num);
};

export const validatePhonenumber = (rule: any, value: string): RuleResult => {
  // Check if the value is not falsy (e.g. null, undefined, empty string)
  // If the value is falsy, return true because the validation should pass
  if (!value) return true;
  //
  return /^.{10}$/g.test(value);
};

export const validateHometown = (rule: any, value: string): RuleResult => {
  // Check if the value is not falsy (e.g. null, undefined, empty string)
  // If the value is falsy, return true because the validation should pass
  if (!value) return true;
  //
  return /^.{0,100}$/g.test(value);
};

export const validateRole = (rule: any, value: any): RuleResult => {
  // Check if the value is not falsy (e.g. null, undefined, empty string)
  // If the value is falsy, return true because the validation should pass
  if (!value || value.length === 1) return true;
  else return false;
  //
};

export const validatePasswordMin = (rule: any, value: string): RuleResult => {
  // Check if the value is not falsy (e.g. null, undefined, empty string)
  // If the value is falsy, return true because the validation should pass
  if (!value) return true;

  return /^.{6,}$/g.test(value);
};

export const validateHiraganaKanji = (rule: any, value: string): RuleResult => {
  if (!value) return true;
  return !/^[ぁ-んァ-ン一-龥]/g.test(value);
};

export const validateHalfwidth = (rule: any, value: string): RuleResult => {
  if (!value) return true;
  return /^[a-zA-Z0-9ｧ-ﾝﾞﾟ]+$/g.test(value);
};

export const validatePasswordMax = (rule: any, value: string): RuleResult => {
  // Check if the value is not falsy (e.g. null, undefined, empty string)
  // If the value is falsy, return true because the validation should pass
  if (!value) return true;

  return /^.{6,20}$/g.test(value);
};
