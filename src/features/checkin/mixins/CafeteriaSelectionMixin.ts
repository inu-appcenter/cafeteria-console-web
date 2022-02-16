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

    async fetchCafeteria() {
      const allCafeteria = await Cafeteria.find();
      const cafeteriaSupportingBooking = allCafeteria.filter(c => c.supportBooking);

      const previouslySelectedId = Number.parseInt(localStorage.getItem('qr-scanner-selected-cafeteria') ?? '1');

      this.allCafeteria = cafeteriaSupportingBooking;
      this.selectedCafeteria = cafeteriaSupportingBooking.find(c => c.id === previouslySelectedId); // TODO
    },
  },
});
