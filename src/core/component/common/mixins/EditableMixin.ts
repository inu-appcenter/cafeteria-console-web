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
import ValueMixin from '@/core/component/common/mixins/ValueMixin';

/**
 * 값(value)을 편집할 수 있는 mixin.
 */
export default Vue.extend({
  mixins: [ValueMixin],

  props: {
    editing: {
      type: Boolean,
      required: false,
    },
  },

  methods: {
    /**
     * input 이벤트에 대해 이 update를 호출해 주세요.
     */
    update(newValue) {
      this.$emit('input', newValue);
    },
  },
});
