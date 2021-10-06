import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      scannerError: null,

      camera: 'front',
      inverted: true,
      cameraOriginal: null,
    };
  },

  watch: {
    camera() {
      console.log(`카메라는 이제 ${this.camera}!`);
    },
  },

  methods: {
    async onInit(promise: Promise<unknown>) {
      try {
        await promise;
      } catch (e) {
        this.scannerError = e;

        console.error(e);
      }
    },

    suspendCamera() {
      this.cameraOriginal = this.camera;
      this.camera = null;
    },

    resumeCamera() {
      this.camera = this.cameraOriginal;
    },

    reloadCamera(showToast: boolean = false) {
      this.suspendCamera();
      this.reloadCamera();

      if (showToast) {
        this.$toasted.show(`카메라를 재시작합니다.`, {
          position: 'top-center',
          duration: 2000,
          icon: 'done',
        });
      }
    },

    invertCamera(showToast: boolean = false, setTo?: boolean) {
      if (setTo === undefined) {
        this.inverted = !this.inverted;
      } else {
        this.inverted = setTo;
      }

      if (showToast) {
        this.$toasted.show(`좌우 반전이 ${this.inverted ? '켜졌습니다' : '꺼졌습니다'}.`, {
          position: 'top-center',
          duration: 2000,
          icon: 'done',
        });
      }
    },
  },
});
