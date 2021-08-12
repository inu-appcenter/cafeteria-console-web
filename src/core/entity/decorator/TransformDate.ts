import {Transform, Type} from 'class-transformer';

export default function TransformDate() {
  const toPlain = Transform(
    ({value}) => {
      if (value instanceof Date) {
        return value.toISOString();
      } else {
        return value;
      }
    },
    {
      toPlainOnly: true,
    },
  );

  const toClass = Transform(
    ({value}) => {
      if (typeof value === 'string') {
        return new Date(value);
      } else {
        return value;
      }
    },
    {
      toClassOnly: true,
    },
  );

  return function (target: any, key: string) {
    toPlain(target, key);
    toClass(target, key);
  };
}
