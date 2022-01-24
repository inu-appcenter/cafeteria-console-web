<!--
  - This file is part of INU Cafeteria.
  -
  - Copyright 2022 INU Global App Center <potados99@gmail.com>
  -
  - INU Cafeteria is free software: you can redistribute it and/or modify
  - it under the terms of the GNU General Public License as published by
  - the Free Software Foundation, either version 3 of the License, or
  - (at your option) any later version.
  -
  - INU Cafeteria is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU General Public License for more details.
  -
  - You should have received a copy of the GNU General Public License
  - along with this program.  If not, see <https://www.gnu.org/licenses/>.
  -->

<template>
  <div ref="wrapper" class="qrcode-scanner-wrapper">
    <!-- 스캐너 표면 -->
    <qrcode-stream :class="{'inverse-horizontal': inverted}" :camera="camera" @decode="onDecode" @init="onInit" />

    <!-- 그 위를 덮고 있는 나머지들 -->
    <div class="qrcode-overlay-surface">
      <!-- 네모 프레임 -->
      <div @click="() => reloadCamera(true)" class="scanner-frame-container">
        <!-- 네모 -->
        <div class="scanner-frame"></div>
      </div>

      <!-- 카메라 전환 버튼 -->
      <button v-show="!(noRearCamera || noFrontCamera)" class="bottom-left-button" @click="() => switchCamera(true)">
        ⟳
      </button>

      <!-- 카메라 좌우반전 버튼 -->
      <button class="bottom-right-button" @click="() => invertCamera(true)">⇔</button>

      <!-- 로딩 오버레이 -->
      <div v-show="checkInLoading" class="informative-overlay-content dark-blur-backdrop">
        <v-progress-circular indeterminate />
        서버와 통신중입니다.
      </div>

      <!-- 성공 메시지 오버레이 -->
      <div v-show="checkInSuccess" class="informative-overlay-content dark-blur-backdrop">✅ 체크인 성공</div>
    </div>

    <!-- 화면 상단에 위치한 반투명 오버레이 -->
    <div @click="giveSomeHelp" class="overlay dark-blur-backdrop">
      <div class="overlay-top">
        <!-- v-if를 써야 안쪽 evaluation을 막을 수 있다. v-show는 다 계산하고 가리기만 함. -->
        <span v-if="context.isAvailable()">
          {{ selectedCafeteria ? selectedCafeteria.displayName : '-' }}
          {{ context.timeSlotStart.toLocaleTimeString() }} ~
          {{ context.timeSlotEnd.toLocaleTimeString() }}
          사이에
        </span>
        <span v-else>
          지금은 {{ selectedCafeteria ? selectedCafeteria.displayName : '-' }}이(가) 예약을 운영하지 않습니다.
        </span>
      </div>
      <div class="overlay-section-container">
        <div class="overlay-section">
          <div class="section-label">예약</div>
          <div class="section-value">{{ context.expected == null ? '-' : context.expected }}명</div>
        </div>
        <div class="overlay-section">
          <div class="section-label">입장</div>
          <div class="section-value">{{ context.actual == null ? '-' : context.actual }}명</div>
        </div>
        <div class="overlay-section">
          <div class="section-label">총원</div>
          <div class="section-value">{{ context.total == null ? '-' : context.total }}명</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckInMixin from '@/features/checkin/mixins/CheckInMixin';
// noinspection ES6CheckImport
import {QrcodeStream} from 'vue-qrcode-reader';

export default {
  mixins: [CheckInMixin],
  name: 'CheckIn',

  components: {QrcodeStream},

  methods: {
    giveSomeHelp() {
      this.$dialog.info({
        title: '현황 표시 안내',
        text: `"예약"은 현재 시간대에 예약한 사람 수를 나타냅니다.<br/>
        "입장"은 현재 시간대에 예약 및 입장한 사람 수를 나타냅니다.<br/>
        "총원"은 최근 30분 내에 예약증을 제시한 모든 사람의 수를 나타냅니다.`,
        showClose: false,
        actions: {
          ok: '확인',
        },
      });
    },
  },
};
</script>

<style scoped>
.informative-overlay-content {
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;

  font-size: 24px;
}
.dark-blur-backdrop {
  color: white;
  background: #00000099;
  backdrop-filter: blur(5px);
}
.overlay {
  position: absolute;
  top: 0;
  width: 100%;
}
.overlay-top {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 8px 0;
  font-size: 12px;
}
.overlay-section-container {
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 2px 6px 6px;
}
.overlay-section {
  font-size: 18px;
  text-align: center;
}
.section-label {
  font-size: 14px;
}
.section-value {
  font-weight: bold;
}
.qrcode-scanner-wrapper {
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.qrcode-overlay-surface {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;

  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.bottom-left-button {
  position: absolute;
  font-size: 36px;
  padding: 4px;
  left: 12px;
  bottom: 12px;
}
.bottom-right-button {
  position: absolute;
  font-size: 36px;
  padding: 4px;
  right: 12px;
  bottom: 12px;
}
.scanner-frame-container {
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.scanner-frame {
  width: 40%;
  padding-bottom: 40%;

  border: 3px dashed #ffc341;
  outline: 10000px solid #00000040;
  background: transparent;
}
.inverse-horizontal {
  -moz-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>
