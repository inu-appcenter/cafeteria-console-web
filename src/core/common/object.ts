import {OnlyFields} from '@/core/common/types';

/**
 * 오브젝트에서 함수를 제외한 필드만 남긴 새로운 오브젝트를 만들어 반환합니다.
 *
 * @param source 원본 오브젝트.
 */
export function onlyFields<T>(source: T): OnlyFields<T> {
  const result: any = {};

  Object.assign(result, source);

  for (const key of Object.keys(source)) {
    if (typeof source[key] === 'function') {
      delete result[key];
    }
  }

  return result;
}
