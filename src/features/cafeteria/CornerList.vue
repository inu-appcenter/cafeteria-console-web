<template>
  <GenericList v-bind="cornerProps" />
</template>

<script>
import Corner from '@/features/cafeteria/Corner';
import GenericList from '@/core/component/list/GenericList';

export default {
  name: 'CornerList',
  components: {GenericList},

  data() {
    return {
      cornerProps: {
        entityClass: Corner,

        formValidator: (corner, allCorners) => {
          return !allCorners.find(c => c.id === corner.id); // should not exist.
        },
      },
    };
  },
};
</script>

<style scoped></style>
