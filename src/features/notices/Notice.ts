import BaseEntity from '@/core/entity/BaseEntity';
import Entity from '@/core/entity/decorator/Entity';
import Field from '@/core/entity/decorator/Field';
import TransformDate from '@/core/entity/decorator/TransformDate';
import {stringNotEmpty} from '@/core/component/common/validation';

@Entity({displayName: '공지'})
export default class Notice extends BaseEntity {
  @Field({displayName: '식별자', mutable: false})
  id: number;

  @Field({displayName: '제목', validate: stringNotEmpty})
  title: string;

  @Field({type: 'text', displayName: '내용', validate: stringNotEmpty})
  body: string;

  @Field({displayName: '타겟 운영체제', validate: stringNotEmpty})
  targetOs: string;

  @Field({displayName: '타겟 앱 버전(semver)', validate: stringNotEmpty})
  targetVersion: string;

  @Field({displayName: '생성 일시', mutable: false})
  @TransformDate()
  createdAt: Date;

  @Field({displayName: '업데이트 일시', mutable: false})
  @TransformDate()
  updatedAt: Date;
}
