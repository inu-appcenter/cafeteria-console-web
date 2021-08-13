import BaseEntity from '@/core/entity/BaseEntity';
import Entity from '@/core/entity/decorator/Entity';
import Field from '@/core/entity/decorator/Field';

@Entity({displayName: '식단 파싱 정규식'})
export default class MenuParseRegex extends BaseEntity {
  @Field({displayName: '식별자'})
  id: number;

  @Field({displayName: '정규식', type: 'text'})
  regex: string;

  @Field({displayName: '코멘트', type: 'string'})
  comment?: string;
}
