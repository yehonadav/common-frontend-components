import {string} from "yup";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const optionalDate = () => string().nullable().test('optional date', "invalid date", function(value) {
  const { path, createError } = this;
  // [value] - value of the property being tested
  // [path]  - property name,

  try {
    // @ts-ignore
    value && new Date(value).toISOString()
    return true
  } catch (e) {
    return createError({path, message: `invalid date ${e}`})
  }
});