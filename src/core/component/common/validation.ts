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
  return exists(value) || 'Required.';
}

export function stringNotEmpty(value: any) {
  return (exists(value) && isString(value) && value.length > 0) || 'Should not be empty.';
}

export function number(value: any) {
  return exists(value) && isNumber(value);
}

export function numberOverZero(value: any) {
  return (exists(value) && isNumber(value) && value > 0) || 'Should be over zero';
}

export function numberNonNegative(value: any) {
  return (exists(value) && isNumber(value) && value >= 0) || 'Should be over zero';
}
