import BaseEntity from '@/core/entity/BaseEntity';
import Entity from '@/core/entity/decorator/Entity';
import Field from '@/core/entity/decorator/Field';
import {numberOverZero} from '@/core/component/common/validation';
import VisitRepository from '@/features/visit/VisitRepository';

@Entity({displayName: '방문 기록'})
export default class VisitRecord extends BaseEntity {
  @Field({displayName: '학번'})
  studentId?: string;

  @Field({displayName: '휴대전화 번호'})
  phoneNumber?: string;

  @Field({visible: false, displayName: '방문한 학식당의 식별자', validate: numberOverZero})
  cafeteriaId: number = 1;

  async save(): Promise<this> {
    // 여기서는 GraphQL을 통해 직접 엔티티 저장 요청을 보내지 않고,
    // 별도의 API를 사용하도록 유도합니다.
    await VisitRepository.leaveVisitRecord(this);
    return this;
  }
}
