import Vue from 'vue';
import ScannerResultMixin from '@/features/checkin/mixins/ScannerResultMixin';
import ScannerSwitchMixin from '@/features/checkin/mixins/ScannerSwitchMixin';
import ScannerFullScreenMixin from '@/features/checkin/mixins/ScannerFullScreenMixin';

export default Vue.extend({
  mixins: [ScannerResultMixin, ScannerSwitchMixin, ScannerFullScreenMixin],
});
