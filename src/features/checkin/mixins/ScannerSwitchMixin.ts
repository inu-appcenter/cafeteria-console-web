/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2022 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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

      if (triedFrontCamera) {
        console.log('오우, 전면 카메라가 없군요.');
        this.noFrontCamera = true;
      }
      if (triedRearCamera) {
        console.log('오우, 후면 카메라가 없군요.');
        this.noRearCamera = true;
      }

      this.switchCamera();
    },
  },

  methods: {
    switchCamera(showToast: boolean = false) {
      console.log('카메라를 교체합니다.');

      if (this.noRearCamera && this.noFrontCamera) {
        console.log('카메라가 없네요! 자동으로 돌립니다.');
        this.camera = 'auto';
        return;
      }

      switch (this.camera) {
        case 'front':
          console.log('전면에서 후면으로 전환합니다.');
          this.camera = 'rear';
          this.invertCamera(false, false);
          break;
        case 'rear':
          console.log('후면에서 전면으로 전환합니다.');
          this.camera = 'front';
          this.invertCamera(false, true);
          break;
      }

      if (showToast) {
        this.$toasted.show(`카메라가 전환되었습니다(${this.camera}).`, {
          position: 'top-center',
          duration: 2000,
          icon: 'done',
        });
      }
    },
  },
});
