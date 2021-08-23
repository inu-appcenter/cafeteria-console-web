<template>
  <GenericList v-bind="cafeteriaDayOffProps" />
</template>

<script>
import CafeteriaDayOff from '@/features/booking/CafeteriaDayOff';
import GenericList from '@/core/component/list/GenericList';

export default {
  name: 'CafeteriaDayOffList',
  components: {GenericList},
  data() {
    return {
      cafeteriaDayOffProps: {
        entityClass: CafeteriaDayOff,
      },
    };
  },
};
</script>
