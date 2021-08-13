<template>
  <GenericList v-bind="cafeteriaProps" />
</template>

<script>
import Cafeteria from '@/features/cafeteria/Cafeteria';
import GenericList from '@/core/component/list/GenericList.vue';

export default {
  name: 'CafeteriaList',
  components: {GenericList},

  data() {
    return {
      cafeteriaProps: {
        entityClass: Cafeteria,
      },
    };
  },
};
</script>

<style scoped></style>
