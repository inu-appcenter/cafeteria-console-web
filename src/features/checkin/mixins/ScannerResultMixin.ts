import Vue from 'vue';
import ScannerBaseMixin from '@/features/checkin/mixins/ScannerBaseMixin';

export default Vue.extend({
  mixins: [ScannerBaseMixin],

  methods: {
    async onDecode(content: string) {
      await this.handleDecodeResult(content);
    },

    /**
     * 스캔이 완료된 후에 적절한 일을 수행하도록 호출되는 콜백입니다.
     *
     * @param content 스캔 결과
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async handleDecodeResult(content: string): Promise<void> {
      /**
       * 하위 믹스인 또는 컴포넌트에서 꼭 반드시 오버라이드 해주세요!
       */
      throw Error('Not implemented');
    },
  },
});
