<template>
  <GenericList v-bind="cornerProps" />
</template>
<script>

import Corner from '@/pages/home/features/cafeteria/entities/Corner';
import GenericList from '@/pages/home/common/GenericList';
import cornerRepository from '@/pages/home/features/cafeteria/data/CornerRepository';

export default {
  name: 'CornerList',
  components: {GenericList},

  data: () => ({
    cornerProps: {
      keyName: 'id',
      itemName: 'corner',
      itemDisplayName: '코너',
      domainFields: Corner.fields(),

      itemGenerator: () => {
        return new Corner({});
      },
      formValidator: (corner, allCorners) => {
        return !allCorners.find((c) => c.id === corner.id); // should not exist.
      },

      onFetch: async () => cornerRepository.getAllCorners(),
      onAdd: (item) => {
        console.log(item);
      },
      onUpdate: (item) => {
        console.log(item);
      },
      onDelete: (item) => {
        console.log(item);
      }
    }
  }),

  methods: {

  }
}

</script>

<style scoped>

</style>
