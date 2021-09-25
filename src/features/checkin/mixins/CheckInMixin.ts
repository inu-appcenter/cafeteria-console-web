import Vue from 'vue';
import CheckInContextMixin from '@/features/checkin/mixins/CheckInContextMixin';
import CheckInRequestMixin from '@/features/checkin/mixins/CheckInRequestMixin';

export default Vue.extend({
  mixins: [CheckInContextMixin, CheckInRequestMixin],
});
