<template>
  <GenericList v-bind="cafeteriaProps" />
</template>

<script lang="ts">
import Cafeteria from '@/features/cafeteria/Cafeteria';
import GenericList from '@/core/component/list/GenericList.vue';

export default {
  name: 'CafeteriaList',
  components: {GenericList},

  data() {
    return {
      cafeteriaProps: {
        entityClass: Cafeteria,

        formValidator: (cafeteria, allCafeteria) => {
          return !allCafeteria.find(c => c.id === cafeteria.id); // should not exist.
        },
      },
    };
  },
};
</script>

<style scoped></style>
