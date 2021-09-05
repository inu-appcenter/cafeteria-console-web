import Vue from 'vue';
import ScannerBaseMixin from '@/features/checkin/mixins/ScannerBaseMixin';

export default Vue.extend({
  mixins: [ScannerBaseMixin],

  methods: {
    paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

        ctx.strokeStyle = 'green';
        ctx.lineWidth = 5;

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
