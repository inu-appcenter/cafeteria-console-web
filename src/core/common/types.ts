/* eslint-disable @typescript-eslint/ban-types */

export type ConstructorType<T> = {new (): T};
export type ObjectType<T> = ConstructorType<T> | Function;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]> | T[P];
};

/**
 * 함수를 제거한 타입입니다.
 */
export type OnlyFields<T> = Pick<T, FieldKeys<T>>;
type FieldKeys<T> = {
  [P in keyof T]: Exclude<T[P], undefined> extends Function ? never : P;
}[keyof T];
