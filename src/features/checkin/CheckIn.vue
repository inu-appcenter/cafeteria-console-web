<template>
  <div>
    <p class="error">{{ error }}</p>

    <qrcode-stream @decode="onDecode" @init="onInit" />
  </div>
</template>

<script>
import QRCodeMixin from '@/features/checkin/QRCodeMixin';

export default {
  mixins: [QRCodeMixin],

  name: 'CheckIn',
};
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>
