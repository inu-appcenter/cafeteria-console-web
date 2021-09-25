import Vue from 'vue';
import {QrcodeStream} from 'vue-qrcode-reader';
import Context from '@/features/checkin/Context';
import CheckInRepository from '@/features/checkin/CheckInRepository';
import ApiMixin from '@/core/component/common/mixins/ApiMixin';
import Cafeteria from '@/features/cafeteria/Cafeteria';
import ScannerMixin from '@/features/checkin/mixins/ScannerMixin';
import {HandleDecodeResult} from '@/features/checkin/mixins/ScannerResultMixin';
import {playSound} from '@/utils/audio';

export default Vue.extend({
  mixins: [ApiMixin, ScannerMixin],

  components: {QrcodeStream},

  mounted() {
    this.fetchCafeteria();
    this.startFetchingContext();
  },

  beforeDestroy() {
    this.stopFetchingContext();
  },

  data() {
    return {
      allCafeteria: undefined,
      selectedCafeteria: undefined,

      timer: undefined,
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
    async fetchCafeteria() {
      const allCafeteria = await Cafeteria.find();
      const cafeteriaSupportingBooking = allCafeteria.filter(c => c.supportBooking);

      this.allCafeteria = cafeteriaSupportingBooking;
      this.selectedCafeteria = cafeteriaSupportingBooking[0]; // TODO
    },

    startFetchingContext() {
      this.timer = setInterval(this.fetchContext, 1000);
    },

    stopFetchingContext() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = undefined;
      }
    },

    async fetchContext() {
      if (this.timer == null) {
        // 타이머가 없으면(멈췄으면) fetch 불능 상태인 것!
        return;
      }

      if (this.selectedCafeteria == null) {
        // 현재 선택된 식당이 없으면 fetch 불능 상태인 것!
        return;
      }

      try {
        this.context = await CheckInRepository.fetchContext(1);
      } catch (e) {
        this.fail('입장 현황을 가져오는 데에 실패했습니다.');
        this.stopFetchingContext();
      }
    },

    async handleDecodeResult(ticket: string): Promise<HandleDecodeResult> {
      try {
        await CheckInRepository.checkIn(ticket);

        this.fetchContext().then();

        playSound('/sounds/success.mp3').then();

        return {
          error: undefined,
        };
      } catch (e) {
        playSound('/sounds/fail.mp3').then();

        return {
          error: {
            error: e.error,
            message: e.message,
          },
        };
      }
    },
  },
});
