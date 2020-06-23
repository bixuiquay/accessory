// Purpose: Only accept digits(0-9) and not start by 0.
export const isOnlyDigits = (value: string): boolean => {
  if (!value || !value.trim().length) {
    return false;
  }

  return new RegExp(/^[1-9][0-9]*$/g).test(value);
}
