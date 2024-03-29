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
import BaseEntity from '@/core/entity/BaseEntity';
import {classToClass} from 'class-transformer';

/**
 * GenericList의 CRUD 믹스인의 공통 부분입니다.
 */
export default Vue.extend({
  mixins: [GenericMixin],

  data() {
    return {
      itemGenerator: () => new this.$props.entityClass(),
      formValidator: (item, allItem) => {
        const idOfThisItem = Number.parseInt(item.id);
        if (isNaN(idOfThisItem)) {
          return true; // id가 없으면 통과!
        }

        const allIdsOfItems = allItem.map(i => i.id);

        const idIsDuplicated = allIdsOfItems.includes(idOfThisItem);

        return !idIsDuplicated;
      },

      // 편집한 내용을 저장하기 전에 잠시 백업하는 변수.
      itemBeforeEdit: {},

      // 폼에 사용할 새 아이템.
      newItem: new this.$props.entityClass(),
      newItemDialogVisible: false,
    };
  },

  methods: {
    redraw() {
      this.$nextTick(() => {
        this.$redrawVueMasonry();
      });
    },

    backupItem<T extends BaseEntity>(item: T) {
      // 백업할 때에는 새 deep copy를 만들어 줍니다.
      this.itemBeforeEdit[item[this.keyName]] = classToClass(item);
    },

    restoreItem<T extends BaseEntity>(item: T) {
      // 복원할 때에는 이미 존재하는 인스턴스에 값만 넣어 줍니다.
      Object.assign(item, this.itemBeforeEdit[item[this.keyName]]);
    },

    isNewItemValid<T extends BaseEntity>(item: T) {
      const itemValid = this.isItemValid(item);
      const itemValidAsANewItem = this.formValidator(item, this.allItems);

      return itemValid && itemValidAsANewItem;
    },
  },
});
