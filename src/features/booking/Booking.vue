<template>
  <v-container fluid>
    <CafeteriaBookingParamsList />
  </v-container>
</template>

<script>
import CafeteriaBookingParamsList from '@/features/booking/CafeteriaBookingParamsList';
export default {
  name: 'Booking',
  components: {CafeteriaBookingParamsList},
};
</script>

<style scoped></style>
