import BaseEntity from '@/core/entity/BaseEntity';
import User from '@/features/questions/User';
import Answer from '@/features/questions/Answer';
import Field from '@/core/entity/decorator/Field';
import Entity from '@/core/entity/decorator/Entity';
import TransformDate from '@/core/entity/decorator/TransformDate';

@Entity({displayName: '1:1 사용자 문의'})
export default class Question extends BaseEntity {
  @Field({mutable: false, visible: false})
  id: number;

  @Field({mutable: false, displayName: '기기 정보'})
  deviceInfo: string;

  @Field({mutable: false, displayName: '앱 버전'})
  appVersion: string;

  @Field({mutable: false, visible: false})
  content: string;

  @Field({mutable: false, visible: false, entityClass: User})
  user: User;

  @Field({mutable: false, visible: false})
  @TransformDate()
  askedAt: Date;

  @Field({mutable: true, visible: false, entityClass: Answer})
  answer?: Answer;
}
