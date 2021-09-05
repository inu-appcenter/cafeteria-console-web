<template>
  <div>
    <qrcode-stream :camera="camera" :track="paintOutline" @decode="onDecode" @init="onInit">
      <div v-show="showScanConfirmation" class="scan-confirmation">❤️</div>
    </qrcode-stream>

    <div class="overlay">
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
.scan-confirmation {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.8);

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;

  font-size: 36px;
}
.overlay {
  position: absolute;
  top: 0;
  width: 100%;
  color: white;
  background: #00000099;
  backdrop-filter: blur(5px);
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
</style>
