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
