import Vue from 'vue';
import stringifyError from '@/features/checkin/stringifyError';

export default Vue.extend({
  data() {
    return {
      camera: 'auto',
      scanResult: null,
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

    async onDecode(content) {
      this.scanResult = content;

      this.pause();
      await this.timeout(500);
      this.unpause();

      this.scanResult = null;
    },

    unpause() {
      this.camera = 'auto';
    },

    pause() {
      this.camera = 'off';
    },

    timeout(ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms);
      });
    },

    paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

        ctx.strokeStyle = 'red';

        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const {x, y} of otherPoints) {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
      }
    },
  },
});
