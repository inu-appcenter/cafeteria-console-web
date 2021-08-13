import BaseEntity from '@/core/entity/BaseEntity';
import Entity from '@/core/entity/decorator/Entity';
import Field from '@/core/entity/decorator/Field';

@Entity({displayName: '바코드 태그 기록'})
export default class DiscountProcessHistory extends BaseEntity {
  @Field({displayName: '식별자'})
  id: number;

  @Field({displayName: '날짜'})
  timestamp: Date;

  @Field({displayName: '유형(Verify | Commit | Cancel)'})
  type: 'Verify' | 'Commit' | 'Cancel' | string;

  @Field({displayName: '학번'})
  studentId: string;

  @Field({displayName: '식당 코드'})
  cafeteriaId: number;

  @Field({displayName: '식사(4 | 2 | 1)'})
  mealType: number;

  @Field({displayName: '결과 코드'})
  failedAt: number;

  @Field({displayName: '메시지'})
  message: string;
}
