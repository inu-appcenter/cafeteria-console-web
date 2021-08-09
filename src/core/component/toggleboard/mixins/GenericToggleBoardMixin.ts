import Vue from 'vue';
import GenericMixin from '@/core/component/common/mixins/GenericMixin';

export default Vue.extend({
  mixins: [GenericMixin],

  props: {
    nameFieldName: String,
    toggleFieldName: String,
    descriptionFieldName: String,
  },

  data() {
    return {
      detailsDialogVisible: [], // Not that neat way. See https://stackoverflow.com/a/58027107/11929317.
    };
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
