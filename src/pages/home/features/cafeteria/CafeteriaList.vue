<template>
  <GenericList v-bind="cafeteriaProps" />
</template>
<script>

import Cafeteria from '@/pages/home/features/cafeteria/entities/Cafeteria';
import GenericList from '@/pages/home/common/GenericList';
import repository from '@/data/Repository';

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

      fetchItems: async () => repository.getAllCafeteria(),
      itemGenerator: () => {
        return new Cafeteria({});
      },

      formValidator: (cafeteria, allCafeteria) => {
        return !(cafeteria.id in allCafeteria.map((c) => c.id));
      },
      onUpdate: (items) => {
        // When things got changed from client.
        console.log(items);
      }
    }
    };
  },

  methods: {

  }
}

</script>

<style scoped>

</style>
