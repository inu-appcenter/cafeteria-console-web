import 'reflect-metadata';

import {plainToClass, Type} from 'class-transformer';

class PrintableString {
  value: string;

  print() {
    console.log(`value is ${this.value}`);
  }
}

class Person {
  @Type(() => PrintableString)
  name: PrintableString;
  age: number;
}

describe('사용법을 익혀보자', () => {
  it('데코레이터 하나도 안 붙은 클래스!', () => {
    const rawPerson = {
      name: {
        value: 'hihi my name',
      },
      age: 23,
    };

    const result = plainToClass(Person, rawPerson);

    result.name.print();
  });
});
