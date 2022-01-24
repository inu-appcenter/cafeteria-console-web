/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2022 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import Vue from 'vue';
import CheckInBaseMixin from '@/features/checkin/mixins/CheckInBaseMixin';
import Context from '@/features/checkin/Context';
import Cafeteria from '@/features/cafeteria/Cafeteria';
import CheckInRepository from '@/features/checkin/CheckInRepository';

export default Vue.extend({
  mixins: [CheckInBaseMixin],

  mounted() {
    this.fetchCafeteria();
    this.startFetchingContext();
  },

  beforeDestroy() {
    this.stopFetchingContext();
  },

  data() {
    return {
      allCafeteria: undefined,
      selectedCafeteria: undefined,

      timer: undefined,
      context: Context.of({}),
    };
  },

  methods: {
    async fetchCafeteria() {
      const allCafeteria = await Cafeteria.find();
      const cafeteriaSupportingBooking = allCafeteria.filter(c => c.supportBooking);

      this.allCafeteria = cafeteriaSupportingBooking;
      this.selectedCafeteria = cafeteriaSupportingBooking[0]; // TODO
    },

    startFetchingContext() {
      this.timer = setInterval(this.fetchContext, 1000);
    },

    stopFetchingContext() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = undefined;
      }
    },

    async fetchContext() {
      if (this.timer == null) {
        // 타이머가 없으면(멈췄으면) fetch 불능 상태인 것!
        console.warn('타이머가 없어 fetch 불능!');
        return;
      }

      if (this.selectedCafeteria == null) {
        // 현재 선택된 식당이 없으면 fetch 불능 상태인 것!
        console.warn('선택된 식당이 없어 fetch 불능!');
        return;
      }

      try {
        this.context = await CheckInRepository.fetchContext(1 /*TODO*/);

        if (this.context.isUnavailable()) {
          console.warn('현재 예약 운영 시간이 아니라 fetch 중단!');

          this.stopFetchingContext();
        }
      } catch (e) {
        this.fail('입장 현황을 가져오는 데에 실패했습니다.');
        this.stopFetchingContext();
      }
    },
  },
});
