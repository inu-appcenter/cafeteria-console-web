import Field from '@/core/entity/decorator/Field';
import Entity from '@/core/entity/decorator/Entity';
import BaseEntity from '@/core/entity/BaseEntity';
import TransformDate from '@/core/entity/decorator/TransformDate';

@Entity({displayName: '서비스 로그'})
export default class Log extends BaseEntity {
  @Field({displayName: '날짜'})
  @TransformDate()
  timestamp: Date;

  @Field({displayName: '메시지'})
  message: string;
}
