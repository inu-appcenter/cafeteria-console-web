import Vue from 'vue';
import stringifyError from '@/features/checkin/stringifyError';

export default Vue.extend({
  data() {
    return {
      camera: 'auto',
      confirmationText: '',
      showScanConfirmation: false,
    };
  },

  methods: {
    async onInit(promise: Promise<unknown>) {
      try {
        await promise;
      } catch (e) {
        alert(stringifyError(e));
      } finally {
        this.showScanConfirmation = this.camera === 'off';
      }
    },

    async onDecode(content: string) {
      this.pause();
      this.confirmationText = '확인 중...';
      this.confirmationText = await this.handleDecodeResult(content);
      await this.timeout(500);
      this.unpause();
    },

    pause() {
      this.camera = 'off';
    },

    /**
     * 스캔이 완료된 후에 적절한 일을 수행하도록 호출되는 콜백입니다.
     *
     * @param content 스캔 결과
     * @return 스캔 결과를 사용하여 요청을 수행하고 받은, 사용자에게 표시할 텍스트
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async handleDecodeResult(content: string) {
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

    unpause() {
      this.camera = 'auto';
    },
  },
});
