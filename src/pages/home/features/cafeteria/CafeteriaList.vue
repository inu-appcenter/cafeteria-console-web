<template>
  <GenericList v-bind="cafeteriaProps"/>
</template>
<script>

import Cafeteria from '@/pages/home/features/cafeteria/entities/Cafeteria';
import GenericList from '@/pages/home/common/GenericList';
import cafeteriaRepository from '@/pages/home/features/cafeteria/data/CafeteriaRpository';

export default {
  name: 'CafeteriaList',
  components: {GenericList},

  data() {
    return {
      cafeteriaProps: {
        keyName: 'id',
        itemName: 'cafeteria',
        itemDisplayName: '카페테리아',
        domainFields: Cafeteria.fields(),

        itemGenerator: () => {
          return new Cafeteria({});
        },
        formValidator: (cafeteria, allCafeteria) => {
          return !allCafeteria.find((c) => c.id === cafeteria.id); // should not exist.
        },

        onFetch: async () => cafeteriaRepository.getAllCafeteria(),
        onAdd: async (item) => cafeteriaRepository.addCafeteria(item),
        onUpdate: async (item) => cafeteriaRepository.updateCafeteria(item),
        onDelete: async (item) => cafeteriaRepository.deleteCafeteria(item)
      }
    };
  },

  methods: {}
}

</script>

<style scoped>

</style>
