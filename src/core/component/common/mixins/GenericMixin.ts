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
import ApiMixin from '@/core/component/common/mixins/ApiMixin';
import BaseEntity from '@/core/entity/BaseEntity';

/**
 * GenericXX 컴포넌트들에서 지겹게 반복되는 부분을 모아놓았습니다.
 */
export default Vue.extend({
  mixins: [ApiMixin],

  props: {
    // GenericXX 컴포넌트들에서는 BaseEntity를 기본적으로 사용합니다. 필수는아님.
    entityClass: {
      type: Function, // 사실 함수 아니고 BaseEntity의 생성자...
      required: false,
    },

    // 데이터를 표시할 순서입니다. 필수는 아님.
    order: {
      type: String,
      required: false,
    },

    // 가져올 데이터의 수입니다. 필수는 아님.
    limit: {
      type: Number,
      required: false,
    },
  },

  data() {
    const entityClass = this.$props.entityClass;
    const meta = entityClass.metadata();

    return {
      meta,

      keyName: 'id',
      itemName: meta.name,
      itemDisplayName: meta.displayName,
      domainFields: meta.fields,

      onFetch: () => entityClass.find({order: this.order, limit: this.limit}),
      onAdd: entity => entity.save(),
      onUpdate: entity => entity.save(),
      onDelete: entity => entity.remove(),

      allItems: [],
      fetching: false,
      error: null,
    };
  },

  methods: {
    async load(): Promise<void> {
      console.log('Fetch 시작!');
      this.fetching = true;

      try {
        console.log('Fetch 성공!');
        this.allItems = await this.onFetch();
      } catch (e) {
        console.log(`Fetch 망함!!! ${e.message}`);
        this.error = e;
      } finally {
        console.log('Fetch 종료!');
        this.fetching = false;
      }
    },

    isItemValid<T extends BaseEntity>(item: T) {
      for (const field of this.domainFields) {
        // Result should be pure 'true'.
        if (field.validate(item[field.name]) !== true) {
          return false;
        }
      }

      return true;
    },
  },
});
