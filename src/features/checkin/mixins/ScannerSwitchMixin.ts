import Vue from 'vue';
import ScannerBaseMixin from '@/features/checkin/mixins/ScannerBaseMixin';

export default Vue.extend({
  mixins: [ScannerBaseMixin],

  data() {
    return {
      noRearCamera: false,
      noFrontCamera: false,
    };
  },

  watch: {
    scannerError(error) {
      const triedFrontCamera = this.camera === 'front';
      const triedRearCamera = this.camera === 'rear';

      const cameraMissingError = error.name === 'OverconstrainedError';

      if (cameraMissingError) {
        if (triedRearCamera) {
          this.noRearCamera = true;
        }
        if (triedFrontCamera) {
          this.noFrontCamera = true;
        }

        this.switchCamera();
      }
    },
  },

  methods: {
    switchCamera() {
      if (this.noRearCamera || this.noFrontCamera) {
        this.camera = 'auto';
      }

      switch (this.camera) {
        case 'front':
          this.camera = 'rear';
          break;
        case 'rear':
          this.camera = 'front';
          break;
      }
    },
  },
});
