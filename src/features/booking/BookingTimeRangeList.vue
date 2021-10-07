<template>
  <GenericList v-bind="bookingTimeRangeProps" />
</template>

<script>
import GenericList from '@/core/component/list/GenericList';
import BookingTimeRange from '@/features/booking/BookingTimeRange';

export default {
  name: 'BookingTimeRangeList',
  components: {GenericList},

  data() {
    return {
      bookingTimeRangeProps: {
        entityClass: BookingTimeRange,
      },
    };
  },
};
</script>
