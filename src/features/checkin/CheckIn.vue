<template>
  <div>
    <qrcode-stream @decode="checkIn" @init="init" />
    <div class="overlay overlay-container">
      <div class="overlay-section">
        <div class="section-label">예약</div>
        <div class="section-value">{{ context.expected }}/{{ context.capacity }}</div>
      </div>
      <div class="overlay-section">
        <div class="section-label">입장</div>
        <div class="section-value">{{ context.actual }}/{{ context.capacity }}</div>
      </div>
      <div class="overlay-section">
        <div class="section-label">총원</div>
        <div class="section-value">{{ context.total }}</div>
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
.overlay-container {
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 8px;
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
