<template>
  <div
    ref="wrapper"
    :class="{fullscreen: fullscreen, 'qrcode-scanner-wrapper': !fullscreen}"
    @click="fullscreen = !fullscreen"
    @fullscreenchange="onFullscreenChange"
  >
    <qrcode-stream
      class="qrcode-scanner-surface"
      :camera="camera"
      :track="paintOutline"
      @decode="onDecode"
      @init="onInit"
    >
      <!-- 네모 프레임 -->
      <div class="scanner-frame-container">
        <div class="scanner-frame"></div>
      </div>

      <!-- 카메라 전환 버튼 -->
      <button v-show="!(noRearCamera || noFrontCamera)" class="bottom-right-button" @click="switchCamera">🔄</button>

      <!-- 성공 메시지 오버레이 -->
      <transition name="fade">
        <div v-show="result && result.success" class="success-overlay">
          {{ result ? result.message : '' }}
        </div>
      </transition>

      <!-- 실패 메시지 오버레이 -->
      <transition name="fade">
        <div v-show="result && !result.success" class="result-confirmation dark-blur-backdrop">
          {{ result ? result.message : '' }}
        </div>
      </transition>
    </qrcode-stream>

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

export default {
  mixins: [CheckInMixin],

  name: 'CheckIn',
};
</script>

<style scoped>
.result-confirmation {
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;

  font-size: 36px;
}
.success-overlay {
  z-index: 1000;

  position: fixed;
  top: 200px;
  left: 50%;
  /* 가운데에 두려는 발악 */
  transform: translateX(-50%);

  color: white;
  padding: 6px;
  font-size: 18px;
  background: #3e8801ff;
  border-radius: 12px;
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
  aspect-ratio: 1;
  border: 3px dashed #ffc341;
  outline: 10000px solid #00000040;
  background: transparent;
}
</style>
