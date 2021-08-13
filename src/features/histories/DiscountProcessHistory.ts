import BaseEntity from '@/core/entity/BaseEntity';
import Entity from '@/core/entity/decorator/Entity';
import Field from '@/core/entity/decorator/Field';

@Entity({displayName: '바코드 태그 기록'})
export default class DiscountProcessHistory extends BaseEntity {
  @Field({description: '식별자'})
  id: number;

  @Field({description: '날짜'})
  timestamp: Date;

  @Field({description: '유형(Verify | Commit | Cancel)'})
  type: 'Verify' | 'Commit' | 'Cancel' | string;

  @Field({description: '학번'})
  studentId: string;

  @Field({description: '식당 코드'})
  cafeteriaId: number;

  @Field({description: '식사(4 | 2 | 1)'})
  mealType: number;

  @Field({description: '결과 코드'})
  failedAt: number;

  @Field({description: '메시지'})
  message: string;
}
