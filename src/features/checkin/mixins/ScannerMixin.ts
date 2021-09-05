import Vue from 'vue';
import ScannerTrackMixin from '@/features/checkin/mixins/ScannerTrackMixin';
import ScannerResultMixin from '@/features/checkin/mixins/ScannerResultMixin';
import ScannerSwitchMixin from '@/features/checkin/mixins/ScannerSwitchMixin';
import ScannerFullScreenMixin from '@/features/checkin/mixins/ScannerFullScreenMixin';

export default Vue.extend({
  mixins: [ScannerTrackMixin, ScannerResultMixin, ScannerSwitchMixin, ScannerFullScreenMixin],
});
