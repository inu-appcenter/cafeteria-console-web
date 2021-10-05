import Vue from 'vue';
import ScannerResultMixin from '@/features/checkin/mixins/ScannerResultMixin';
import ScannerSwitchMixin from '@/features/checkin/mixins/ScannerSwitchMixin';

export default Vue.extend({
  mixins: [ScannerResultMixin, ScannerSwitchMixin],
});
