import Entity from '@/core/entity/decorator/Entity';
import BaseEntity from '@/core/entity/BaseEntity';
import Field from '@/core/entity/decorator/Field';
import Corner from '@/features/cafeteria/Corner';
import {numberOverZero, stringNotEmpty} from '@/core/component/common/validation';

@Entity({displayName: '카페테리아'})
export default class Cafeteria extends BaseEntity {
  @Field({displayName: '식별자', validate: numberOverZero})
  id: number;

  @Field({displayName: '식당 이름', validate: stringNotEmpty})
  name: string;

  @Field({displayName: '앱에서 표시될 이름', validate: stringNotEmpty})
  displayName: string;

  @Field({displayName: '식당 안내', type: 'text'})
  comment?: string;

  @Field({displayName: '메뉴 정보 제공 여부'})
  supportMenu: boolean;

  @Field({displayName: '예약 지원 여부'})
  supportBooking: boolean;

  @Field({displayName: '할인 제공 여부'})
  supportDiscount: boolean;

  @Field({displayName: '알림 지원 여부'})
  supportNotification: boolean;

  // 안 쓰지만 그냥 넣어봄 ㅎㅎ
  @Field({displayName: '코너', visible: false, mutable: false, entityClass: Corner})
  corners: Corner[];
}
