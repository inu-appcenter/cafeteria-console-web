import Vue from 'vue';
import ApiMixin from '@/core/component/common/mixins/ApiMixin';
import ScannerMixin from '@/features/checkin/mixins/ScannerMixin';

export default Vue.extend({
  mixins: [ApiMixin, ScannerMixin],
});
