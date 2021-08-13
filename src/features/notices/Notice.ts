import BaseEntity from '@/core/entity/BaseEntity';
import Entity from '@/core/entity/decorator/Entity';
import Field from '@/core/entity/decorator/Field';
import TransformDate from '@/core/entity/decorator/TransformDate';

@Entity({displayName: '공지'})
export default class Notice extends BaseEntity {
  @Field({description: '식별자', mutable: false})
  id: number;

  @Field({description: '제목'})
  title: string;

  @Field({description: '내용'})
  body: string;

  @Field({description: '타겟 운영체제'})
  targetOs: string;

  @Field({description: '타겟 앱 버전(semver)'})
  targetVersion: string;

  @Field({description: '생성 일시', mutable: false})
  @TransformDate()
  createdAt: Date;

  @Field({description: '업데이트 일시', mutable: false})
  @TransformDate()
  updatedAt: Date;
}
