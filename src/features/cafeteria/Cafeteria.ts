import Entity from '@/core/entity/decorator/Entity';
import BaseEntity from '@/core/entity/BaseEntity';
import Field from '@/core/entity/decorator/Field';
import validation from '@/core/component/common/validation';
import Corner from '@/features/cafeteria/Corner';

@Entity({displayName: '카페테리아'})
export default class Cafeteria extends BaseEntity {
  @Field({description: '식당 이름', validate: validation.stringNotEmpty})
  name: string;

  @Field({description: '앱에서 표시될 이름', validate: validation.stringNotEmpty})
  displayName: string;

  @Field({description: '식당 안내', type: 'text'})
  comment?: string;

  @Field({description: '메뉴 정보 제공 여부'})
  supportMenu: boolean;

  @Field({description: '할인 제공 여부'})
  supportDiscount: boolean;

  @Field({description: '알림 지원 여부'})
  supportNotification: boolean;

  @Field({description: '코너', entityClass: Corner})
  corners: Corner[];
}
