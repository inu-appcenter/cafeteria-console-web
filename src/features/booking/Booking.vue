<template>
  <v-container fluid>
    <CafeteriaBookingParamsList />

    <CheckInRuleToggleBoard />

    <CafeteriaDayOffList />
  </v-container>
</template>

<script>
import CafeteriaBookingParamsList from '@/features/booking/CafeteriaBookingParamsList';
import CafeteriaDayOffList from '@/features/booking/CafeteriaDayOffList';
import CheckInRuleToggleBoard from '@/features/booking/CheckInRuleToggleBoard';

export default {
  name: 'Booking',
  components: {CheckInRuleToggleBoard, CafeteriaDayOffList, CafeteriaBookingParamsList},
};
</script>

<style scoped></style>
