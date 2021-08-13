import BaseEntity from '@/core/entity/BaseEntity';
import Entity from '@/core/entity/decorator/Entity';
import Field from '@/core/entity/decorator/Field';
import validation from '@/core/component/common/validation';
import TransformDate from '@/core/entity/decorator/TransformDate';

@Entity()
export default class Answer extends BaseEntity {
  @Field({mutable: false, visible: false})
  id: number;

  @Field({displayName: '제목', validate: validation.stringNotEmpty})
  title: string;

  @Field({displayName: '내용', validate: validation.stringNotEmpty, type: 'text'})
  body: string;

  @Field({mutable: false, visible: false})
  @TransformDate()
  answeredAt: Date;

  @Field({mutable: false, visible: false})
  read: boolean;

  @Field({mutable: false, visible: false})
  @TransformDate()
  readAt: Date;
}
