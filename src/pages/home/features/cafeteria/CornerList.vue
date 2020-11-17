<template>
  <GenericList v-bind="cornerProps"/>
</template>
<script>

import Corner from '@/pages/home/features/cafeteria/entities/Corner';
import GenericList from '@/pages/home/common/GenericList';
import cornerRepository from '@/pages/home/features/cafeteria/data/CornerRepository';

export default {
  name: 'CornerList',
  components: {GenericList},

  data() {
    return {
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
        onAdd: async (item) => cornerRepository.addCorner(item),
        onUpdate: async (item) => cornerRepository.updateCorner(item),
        onDelete: async (item) => cornerRepository.deleteCorner(item)
      }
    }
  },

  methods: {}
}

</script>

<style scoped>

</style>
