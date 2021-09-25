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
      const cameraMissingError = error.name === 'OverconstrainedError';

      if (!cameraMissingError) {
        return;
      }

      console.log('앗, 카메라가 없어서 발생하는 OverconstrainedError 에러를 감지했습니다.');

      const triedFrontCamera = this.camera === 'front';
      const triedRearCamera = this.camera === 'rear';

      if (triedRearCamera) {
        console.log('오우, 후면 카메라가 없군요.');
        this.noRearCamera = true;
      }
      if (triedFrontCamera) {
        console.log('오우, 전면 카메라가 없군요.');
        this.noFrontCamera = true;
      }

      this.switchCamera();
    },
  },

  methods: {
    switchCamera() {
      console.log('카메라를 교체합니다.');

      if (this.noRearCamera || this.noFrontCamera) {
        console.log('카메라가 하나 이상 없네요. 자동으로 돌립니다.');
        this.camera = 'auto';
      }

      switch (this.camera) {
        case 'front':
          console.log('전면에서 후면으로 전환합니다.');
          this.camera = 'rear';
          break;
        case 'rear':
          console.log('후면에서 전면으로 전환합니다.');
          this.camera = 'front';
          break;
      }
    },
  },
});
