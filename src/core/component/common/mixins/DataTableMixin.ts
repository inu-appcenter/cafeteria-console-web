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
import GenericMixin from '@/core/component/common/mixins/GenericMixin';

export default Vue.extend({
  mixins: [GenericMixin],

  data() {
    return {
      search: '',

      // data 함수에서는 상위 mixin의 data 함수에서 정의한 값을 꺼내올 수 없다 ㅠㅡㅠ
      // 왜냐하면 지금 타이밍에서는 아직 정의중이기 때문...
      headers: this.$props.entityClass
        .metadata()
        .fields.filter(f => f.visible)
        .map((f, i) => ({
          text: f.displayName || f.name,
          value: f.name,
          align: i === 0 ? 'start' : undefined,
        })),
    };
  },
});
