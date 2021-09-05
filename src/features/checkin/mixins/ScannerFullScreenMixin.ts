import Vue from 'vue';
import ScannerBaseMixin from '@/features/checkin/mixins/ScannerBaseMixin';

export default Vue.extend({
  mixins: [ScannerBaseMixin],

  data() {
    return {
      fullscreen: false,
    };
  },

  watch: {
    fullscreen(enterFullscreen) {
      if (enterFullscreen) {
        this.requestFullscreen();
      } else {
        this.exitFullscreen();
      }
    },
  },

  methods: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onFullscreenChange(event) {
      /**
       * 사용자가 esc 버튼을 사용해 전체 화면을 탈출하는 경우도 있습니다.
       * 그런 상황에 이 콜백이 불립니다.
       * 현재 상황에 맞게 fullscreen에 적절한 값을 넣어 줍니다.
       */
      this.fullscreen = document.fullscreenElement !== null;
    },

    requestFullscreen() {
      const elem = this.$refs.wrapper;

      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    },

    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen().then();
      }
    },
  },
});
