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
import Cafeteria from '@/features/cafeteria/Cafeteria';

export default Vue.extend({
  mounted() {
    this.fetchCafeteria();
  },

  data() {
    return {
      selectionDialog: true,

      allCafeteria: undefined,
      selectedCafeteria: undefined,
    };
  },

  methods: {
    openSelection() {
      this.selectionDialog = true;
    },

    closeSelection() {
      this.selectionDialog = false;
    },

    /**
     * 서버로부터 예약을 지원하는 식당 목록을 불러온 다음,
     * 현재 선택된 식당을 복구(또는 초기화)합니다.
     */
    async fetchCafeteria() {
      const allCafeteria = await Cafeteria.find();
      const cafeteriaSupportingBooking = allCafeteria.filter(c => c.supportBooking);
      const fallback = cafeteriaSupportingBooking[0];

      const savedIdString = localStorage.getItem('qr-scanner-selected-cafeteria');
      const savedId = savedIdString ? Number.parseInt(savedIdString) : undefined;
      const selected = savedId ? cafeteriaSupportingBooking.find(c => c.id === savedId) : fallback;
      const restored = selected ?? fallback;

      if (restored) {
        localStorage.setItem('qr-scanner-selected-cafeteria', restored.id.toString());
      }

      this.allCafeteria = cafeteriaSupportingBooking;
      this.selectedCafeteria = selected;
    },
  },
});
