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
import BaseMixin from '@/core/component/list/mixins/BaseMixin';

/**
 * GenericList의 CRUD 로직 중 생성 쪽을 담당합니다.
 */
export default Vue.extend({
  mixins: [BaseMixin],

  methods: {
    onClickAddItem() {
      this.newItem = this.itemGenerator();
      this.newItemDialogVisible = true;
    },

    onFormUpdate() {
      this.newItem.valid = this.isNewItemValid(this.newItem);
    },

    onClickCancelAddItem() {
      this.newItem = this.itemGenerator();
      this.newItemDialogVisible = false;
    },

    async onClickDoneAddItem() {
      this.newItemDialogVisible = false;

      this.allItems.unshift(this.newItem);

      this.newItem.loading = true;

      const result = await this.showResult(this.onAdd(this.newItem), '추가되었습니다');
      if (result) {
        await this.load(); // 잘 됐으면 새로고침해서 id 받아옵니다.
      } else {
        this.allItems = this.allItems.filter(item => item !== this.newItem); // 잘 안됐으면 추가를 취소합니다.
      }

      this.newItem.loading = false;
    },
  },
});
