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

  data() {
    return {
      context: Context.of({}),
    };
  },

  watch: {
    /**
     * selectedCafeteria가 변할 때마다,
     * 해당 식당에 대한 Context를 구독하는 새로운 이벤트 소스를 등록합니다.
     *
     * @param selected 선택된 식당.
     */
    selectedCafeteria(selected: Cafeteria) {
      console.log(`카페테리아 ${selected.id}의 Context를 관찰하는 이벤트 소스 등록!`);

      CheckInRepository.listenForContext(selected.id, context => {
        console.log(`${selected.displayName}의 Context 업데이트!`);

        this.context = context;
      });

      localStorage.setItem('qr-scanner-selected-cafeteria', selected.id.toString());
    },
  },
});
