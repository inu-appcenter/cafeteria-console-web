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
      },
    };
  },
};
</script>

<style scoped></style>
