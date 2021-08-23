<template>
  <GenericList v-bind="cafeteriaBookingParamsProps" />
</template>

<script>
import GenericList from '@/core/component/list/GenericList';
import CafeteriaBookingParams from '@/features/booking/CafeteriaBookingParams';

export default {
  name: 'CafeteriaBookingParamsList',
  components: {GenericList},

  data() {
    return {
      cafeteriaBookingParamsProps: {
        entityClass: CafeteriaBookingParams,
      },
    };
  },
};
</script>
