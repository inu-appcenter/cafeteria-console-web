<template>
  <v-container fluid>
    <CafeteriaBookingParamsList />

    <BookingTimeRangeList />

    <CheckInRuleToggleBoard />

    <CafeteriaDayOffList />
  </v-container>
</template>

<script>
import CafeteriaBookingParamsList from '@/features/booking/CafeteriaBookingParamsList';
import CafeteriaDayOffList from '@/features/booking/CafeteriaDayOffList';
import CheckInRuleToggleBoard from '@/features/booking/CheckInRuleToggleBoard';
import BookingTimeRangeList from '@/features/booking/BookingTimeRangeList';

export default {
  name: 'Booking',
  components: {
    CafeteriaDayOffList,
    BookingTimeRangeList,
    CheckInRuleToggleBoard,
    CafeteriaBookingParamsList,
  },
};
</script>

<style scoped></style>
