function exists(value: any) {
  return value !== undefined && value !== null;
}

function isNumber(value: any) {
  return typeof value === 'number' && !isNaN(value);
}

function isString(value: any) {
  return typeof value === 'string';
}

export function required(value: any) {
  return exists(value) || '필수입니다.';
}

export function stringNotEmpty(value: any) {
  return (exists(value) && isString(value) && value.length > 0) || '비어 있지 않아야 합니다.';
}

export function number(value: any) {
  return exists(value) && isNumber(value);
}

export function numberOverZero(value: any) {
  return (exists(value) && isNumber(value) && value > 0) || '0보다 커야 합니다.';
}

export function numberNonNegative(value: any) {
  return (exists(value) && isNumber(value) && value >= 0) || '음수가 아니어야 합니다.';
}

export function timeRangeString(timeRangeString: any) {
  return /^[0-2][0-9]:[0-5][0-9]-[0-2][0-9]:[0-5][0-9]$/.test(timeRangeString) || "'mm:hh-mm:hh' 형태를 가져야 합니다.";
}
