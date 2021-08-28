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
