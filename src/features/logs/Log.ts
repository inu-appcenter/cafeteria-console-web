import BaseEntity from '@/core/entity/BaseEntity';
import Entity from '@/core/entity/decorator/Entity';
import Field from '@/core/entity/decorator/Field';

@Entity({displayName: '서비스 로그'})
export default class Log extends BaseEntity {
  @Field({displayName: '날짜'})
  timestamp: Date;

  @Field({displayName: '메시지'})
  message: string;
}
