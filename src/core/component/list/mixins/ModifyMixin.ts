import Vue from 'vue';
import BaseEntity from '@/core/entity/BaseEntity';
import BaseMixin from '@/core/component/list/mixins/BaseMixin';

/**
 * GenericList의 CRUD 로직 중 편집/삭제 쪽을 담당합니다.
 */
export default Vue.extend({
  mixins: [BaseMixin],

  methods: {
    onClickModifyItem<T extends BaseEntity>(item: T) {
      this.backupItem(item);

      item.editing = true;

      this.redraw();
    },

    onModifyItem<T extends BaseEntity>(item: T) {
      item.valid = this.isItemValid(item);
      item.modified = true;
    },

    onClickCancelModifyItem<T extends BaseEntity>(item: T) {
      this.restoreItem(item);

      item.modified = false;
      item.editing = false;

      this.redraw();
    },

    async onClickApplyItem<T extends BaseEntity>(item: T) {
      item.editing = false;
      this.redraw();

      item.loading = true;
      await this.showResult(this.onUpdate(item), '반영되었습니다');
      item.loading = false;
    },

    async onClickDeleteItem<T extends BaseEntity>(item: T) {
      const go = await this.$confirm(
        `정말로 선택하신 ${this.itemDisplayName}을(를) 삭제하시겠습니까?
      (${this.domainFields.map(f => `${f.name}: ${item[f.name]}`).join(', ')})`,
        {buttonTrueText: '삭제', buttonFalseText: '취소'},
      );

      if (!go) {
        return;
      }

      item.loading = true;
      await this.showResult(this.onDelete(item), '삭제되었습니다');
      item.loading = false;

      this.allItems.splice(this.allItems.indexOf(item), 1); // Deleting
    },
  },
});
