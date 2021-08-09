import BaseEntity from '@/core/entity/BaseEntity';
import Entity from '@/core/entity/decorator/Entity';
import Field from '@/core/entity/decorator/Field';
import validation from '@/core/component/common/validation';

@Entity()
export default class CafeteriaValidationParams extends BaseEntity {
  @Field({description: '연관된 카페테리아의 식별자', validate: validation.numberOverZero})
  cafeteriaId: number;

  @Field({description: '요청 검증에 사용하는 토큰', validate: validation.stringNotEmpty})
  token: string;

  @Field({description: '할인 이용 가능한 시간대', validate: availableMealTypeShouldBeValid})
  availableMealTypes: number;

  @Field({description: '아침 식사 시간대', validate: shouldBeValidTimeRangeString})
  breakfast: string;

  @Field({description: '점심 식사 시간대', validate: shouldBeValidTimeRangeString})
  lunch: string;

  @Field({description: '저녁 식사 시간대', validate: shouldBeValidTimeRangeString})
  dinner: string;
}

function availableMealTypeShouldBeValid(mealType) {
  return (validation.number(mealType) && mealType >= 0 && mealType <= 7) || 'From 0 to 7.';
}

function shouldBeValidTimeRangeString(timeRangeString) {
  return /^[0-2][0-9]:[0-5][0-9]-[0-2][0-9]:[0-5][0-9]$/.test(timeRangeString) || "Should be in 'mm:hh-mm:hh' format.";
}
