/**
 * 식당 체크인 현황
 */
export default class Context {
  /**
   * (현재 시간대) 수용 가능 인원
   */
  capacity?: number;

  /**
   * (현재 시간대) 예약 인원
   */
  expected?: number;

  /**
   * (현재 시간대) 입장 인원
   */
  actual?: number;

  /**
   * 현재 상주 인원
   */
  total?: number;

  /**
   * 현재 타임슬롯 시작
   */
  timeSlotStart?: Date;

  /**
   * 현재 타임슬롯 끝
   */
  timeSlotEnd?: Date;

  static of(properties: Partial<Context>) {
    return Object.assign(new Context(), properties);
  }

  /**
   * 현재 시간이 예약을 운영하는 시간대라면 true입니다.
   */
  isAvailable() {
    return this.timeSlotStart != null;
  }

  isUnavailable() {
    return !this.isAvailable();
  }
}
