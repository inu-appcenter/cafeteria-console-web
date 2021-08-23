<template>
  <v-container fluid>
    <CafeteriaBookingParamsList />

    <CafeteriaDayOffList />
  </v-container>
</template>

<script>
import CafeteriaBookingParamsList from '@/features/booking/CafeteriaBookingParamsList';
import CafeteriaDayOffList from '@/features/booking/CafeteriaDayOffList';

export default {
  name: 'Booking',
  components: {CafeteriaDayOffList, CafeteriaBookingParamsList},
};
</script>

<style scoped></style>
