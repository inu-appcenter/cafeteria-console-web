<template>
  <div>
    <qrcode-stream @decode="checkIn" @init="init" />
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
import CheckInMixin from '@/features/checkin/CheckInMixin';

export default {
  mixins: [CheckInMixin],

  name: 'CheckIn',
};
</script>

<style scoped>
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
