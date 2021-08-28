import BaseEntity from '@/core/entity/BaseEntity';
import Entity from '@/core/entity/decorator/Entity';
import Field from '@/core/entity/decorator/Field';
import TransformDate from '@/core/entity/decorator/TransformDate';
import {stringNotEmpty} from '@/core/component/common/validation';

@Entity()
export default class Answer extends BaseEntity {
  @Field({visible: false, mutable: false})
  id: number;

  @Field({visible: false, mutable: false})
  questionId: number;

  @Field({displayName: '제목', validate: stringNotEmpty})
  title: string;

  @Field({displayName: '내용', validate: stringNotEmpty, type: 'text'})
  body: string;

  @Field({mutable: false, visible: false})
  @TransformDate()
  answeredAt: Date = new Date();

  @Field({mutable: false, visible: false})
  read: boolean = false;

  @Field({mutable: false, visible: false})
  @TransformDate()
  readAt: Date;
}
