import Vue from 'vue';
import {QrcodeStream} from 'vue-qrcode-reader';
import stringifyError from '@/features/checkin/stringifyError';
import Context from '@/features/checkin/Context';
import CheckInRepository from '@/features/checkin/CheckInRepository';
import ApiMixin from '@/core/component/common/mixins/ApiMixin';

export default Vue.extend({
  mixins: [ApiMixin],

  components: {QrcodeStream},

  mounted() {
    this.startFetching();
  },

  beforeDestroy() {
    this.stopFetching();
  },

  data() {
    return {
      timer: undefined,
      error: undefined,
      context: Context.of({}),
    };
  },

  watch: {
    error(newVal) {
      if (newVal) {
        alert(newVal);
      }
    },
  },

  methods: {
    init(promise: Promise<unknown>) {
      promise.catch(e => {
        alert(stringifyError(e));
      });
    },

    startFetching() {
      this.timer = setInterval(this.fetch, 1000);
    },

    stopFetching() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = undefined;
      }
    },

    async fetch() {
      if (this.timer == null) {
        // 타이머가 없으면(멈췄으면) fetch 불능 상태인 것!
        return;
      }

      try {
        this.context = await CheckInRepository.fetchContext();
      } catch (e) {
        this.fail('입장 현황을 가져오는 데에 실패했습니다.');
        this.stopFetching();
      }
    },

    async checkIn(ticket: string) {
      try {
        await CheckInRepository.checkIn(ticket);
        this.success('통과');
        await this.fetch();
      } catch (e) {
        this.fail(e.message);
      }
    },
  },
});
