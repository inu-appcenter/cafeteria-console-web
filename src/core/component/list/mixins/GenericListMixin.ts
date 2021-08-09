import Vue from 'vue';
import CreateMixin from '@/core/component/list/mixins/CreateMixin';
import ModifyMixin from '@/core/component/list/mixins/ModifyMixin';

/**
 * GenericList의 CRUD 로직을 커버합니다.
 */
export default Vue.extend({
  mixins: [CreateMixin, ModifyMixin],

  watch: {
    newItemDialogVisible() {
      this.$nextTick(() => {
        this.$refs.newItemForm.resetValidation();
      });
    },
  },
});
