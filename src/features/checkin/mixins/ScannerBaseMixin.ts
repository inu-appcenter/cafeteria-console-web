import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      scannerError: null,

      camera: 'rear',
      cameraOriginal: null,
    };
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
  },
});
