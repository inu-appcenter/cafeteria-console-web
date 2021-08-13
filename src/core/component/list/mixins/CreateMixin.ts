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
      if (!result) {
        this.allItems = this.allItems.filter(item => item !== this.newItem); // Cancel addition.
      }

      this.newItem.loading = false;
    },
  },
});
