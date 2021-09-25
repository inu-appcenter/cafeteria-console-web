<template>
  <div
    ref="wrapper"
    :class="{fullscreen: fullscreen, 'qrcode-scanner-wrapper': !fullscreen}"
    @click="toggleFullScreen"
    @fullscreenchange="onFullscreenChange"
  >
    <qrcode-stream class="qrcode-scanner-surface" :camera="camera" @decode="onDecode" @init="onInit">
      <!-- 네모 프레임 -->
      <div class="scanner-frame-container">
        <!-- 네모 -->
        <div class="scanner-frame"></div>
      </div>

      <!-- 카메라 전환 버튼 -->
      <button v-show="!(noRearCamera || noFrontCamera)" class="bottom-right-button" @click="switchCamera">🔄</button>

      <!-- 로딩 오버레이 -->
      <div v-show="checkInLoading" class="informative-overlay-content dark-blur-backdrop">
        <v-progress-circular indeterminate />
        서버와 통신중입니다.
      </div>

      <!-- 성공 메시지 오버레이 -->
      <div v-show="checkInSuccess" class="informative-overlay-content dark-blur-backdrop">✅ 체크인 성공</div>
    </qrcode-stream>

    <!-- 화면 상단에 위치한 반투명 오버레이 -->
    <div class="overlay dark-blur-backdrop">
      <div class="overlay-top">
        <span>
          {{ new Date().toLocaleTimeString() }}
          {{ selectedCafeteria ? selectedCafeteria.displayName : '-' }}
        </span>
      </div>
      <div class="overlay-section-container">
        <div class="overlay-section">
          <div class="section-label">예약</div>
          <div class="section-value">
            {{ context.expected == null ? '-' : context.expected }}/{{ context.capacity }}
          </div>
        </div>
        <div class="overlay-section">
          <div class="section-label">입장</div>
          <div class="section-value">{{ context.actual == null ? '-' : context.actual }}/{{ context.capacity }}</div>
        </div>
        <div class="overlay-section">
          <div class="section-label">총원</div>
          <div class="section-value">{{ context.total }}</div>
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
.qrcode-scanner-surface {
  display: flex;

  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.fullscreen {
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
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
</style>
