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
  },

  data() {
    return {
      settingsDialog: true,

      allCafeteria: undefined,
      selectedCafeteria: undefined,

      timer: undefined,
      context: Context.of({}),
    };
  },

  watch: {
    selectedCafeteria(selected: Cafeteria) {
      console.log(`카페테리아 ${selected.id}의 Context를 관찰하는 이벤트 소스 등록!`);

      CheckInRepository.listenForContext(selected.id, context => {
        console.log(`${selected.displayName}의 Context 업데이트!`);

        this.context = context;
      });

      localStorage.setItem('qr-scanner-selected-cafeteria', selected.id.toString());
    },
  },

  methods: {
    openSettings() {
      this.settingsDialog = true;
    },

    closeSettings() {
      this.settingsDialog = false;
    },

    async fetchCafeteria() {
      const allCafeteria = await Cafeteria.find();
      const cafeteriaSupportingBooking = allCafeteria.filter(c => c.supportBooking);

      const previouslySelectedId = Number.parseInt(localStorage.getItem('qr-scanner-selected-cafeteria') ?? '1');

      this.allCafeteria = cafeteriaSupportingBooking;
      this.selectedCafeteria = cafeteriaSupportingBooking.find(c => c.id === previouslySelectedId); // TODO
    },
  },
});
