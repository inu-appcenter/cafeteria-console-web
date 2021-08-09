import Vue from 'vue';
import GenericMixin from '@/core/component/common/mixins/GenericMixin';

export default Vue.extend({
  mixins: [GenericMixin],

  props: {
    nameFieldName: {
      type: String,
      required: true,
    },
    toggleFieldName: {
      type: String,
      required: true,
    },
    descriptionFieldName: {
      type: String,
      required: true,
    },
  },

  methods: {
    async onModifyItem(item) {
      item.modified = true;
      item.loading = true;

      await this.showResult(this.onUpdate(item), '반영되었습니다.');

      item.modified = false;
      item.loading = false;
    },
  },
});
