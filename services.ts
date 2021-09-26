import Vue from 'vue';
import Logs from '@/features/logs/Logs.vue';
import Visit from '@/features/visit/Visit.vue';
import Rules from '@/features/rules/Rules.vue';
import Parsing from '@/features/parsing/Parsing.vue';
import CheckIn from '@/features/checkin/CheckIn.vue';
import Booking from '@/features/booking/Booking.vue';
import Notices from '@/features/notices/Notices.vue';
import Questions from '@/features/questions/Questions.vue';
import Histories from '@/features/histories/Histories.vue';
import Cafeteria from '@/features/cafeteria/Cafeteria.vue';
import VisitRecords from '@/features/visitRecords/VisitRecords.vue';

/**
 * 기능에 대한 것은 여기에 모두 정의합니다.
 */

type ServiceItem = {
  name: string;
  displayName: string;
  description: string;
  component: Vue.Component;
};

type ServiceGroup = {
  name: string;
  icon: string;
  displayName: string;
  items: ServiceItem[];
};

const services: ServiceGroup[] = [
  {
    name: 'admin',
    icon: 'mdi-cog',
    displayName: '운영 관리',
    items: [
      {
        name: 'visit',
        displayName: '수기 체크인',
        description: '방문 기록 직접 작성',
        component: Visit,
      },
      {
        name: 'checkin',
        displayName: 'QR 체크인',
        description: '입장 관리용 QR 스캐너 화면',
        component: CheckIn,
      },
      {
        name: 'booking',
        displayName: '예약 설정',
        description: '식당 예약과 관련된 설정',
        component: Booking,
      },
      {
        name: 'rules',
        displayName: '할인 비즈니스 룰',
        description: '할인 요청을 검증하는 규칙',
        component: Rules,
      },
    ],
  },
  {
    name: 'records',
    icon: 'mdi-text',
    displayName: '운영 기록',
    items: [
      {
        name: 'logs',
        displayName: '서버 로그',
        description: '앱 서버가 남기는 모든 기록',
        component: Logs,
      },
      {
        name: 'histories',
        displayName: '할인 바코드 태그 기록',
        description: '사용자가 바코드를 태그한 기록',
        component: Histories,
      },
      {
        name: 'visit-record',
        displayName: '교내 식당 입장 기록',
        description: '사용자가 교내 식당에 입장한 기록',
        component: VisitRecords,
      },
    ],
  },
  {
    name: 'user',
    icon: 'mdi-account',
    displayName: '사용자 지원',
    items: [
      {
        name: 'notices',
        displayName: '공지사항',
        description: '앱 사용자에게 노출될 공지사항',
        component: Notices,
      },
      {
        name: 'questions',
        displayName: '1:1 사용자 문의',
        description: '사용자가 앱에서 작성한 문의',
        component: Questions,
      },
    ],
  },
  {
    name: 'dev',
    icon: 'mdi-hammer',
    displayName: '개발자용',
    items: [
      {
        name: 'cafeteria',
        displayName: '식당 및 코너',
        description: '교내 식당과 코너 정보',
        component: Cafeteria,
      },
      {
        name: 'parsing',
        displayName: '식단 파싱 규칙',
        description: '식단 스트링을 가공하는 정규식',
        component: Parsing,
      },
    ],
  },
];

export default services;
