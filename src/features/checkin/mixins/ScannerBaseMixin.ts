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
      if (showToast) {
        this.$toasted.show(`카메라를 재시작합니다.`, {
          position: 'top-center',
          duration: 2000,
          icon: 'done',
        });
      }

      this.suspendCamera();

      this.$nextTick(() => {
        this.resumeCamera();
      });
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
