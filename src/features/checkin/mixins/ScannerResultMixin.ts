import Vue from 'vue';
import ScannerBaseMixin from '@/features/checkin/mixins/ScannerBaseMixin';

export type HandleDecodeResult = {
  success: boolean;
  message: string;
};

export default Vue.extend({
  mixins: [ScannerBaseMixin],

  data() {
    return {
      cameraOriginal: null,
      result: null,
    };
  },

  methods: {
    async onDecode(content: string) {
      this.result = await this.handleDecodeResult(content);

      if (this.result.success) {
        await this.timeout(2000);
      } else {
        await this.timeout(3000);
      }

      this.result = null;
    },

    /**
     * 스캔이 완료된 후에 적절한 일을 수행하도록 호출되는 콜백입니다.
     *
     * @param content 스캔 결과
     * @return 스캔 사용자에게 표시할 결과
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async handleDecodeResult(content: string): Promise<HandleDecodeResult> {
      /**
       * 하위 믹스인 또는 컴포넌트에서 꼭 반드시 오버라이드 해주세요!
       */
      throw Error('Not implemented');
    },

    timeout(ms: number) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms);
      });
    },
  },
});
