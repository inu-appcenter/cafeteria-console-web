/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2022 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
