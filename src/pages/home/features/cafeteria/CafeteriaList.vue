<template>
  <GenericList v-bind="cafeteriaProps" ></GenericList>
</template>
<script>

import Cafeteria from '@/pages/home/features/cafeteria/entity/Cafeteria';
import GenericList from '@/pages/home/features/cafeteria/GenericList';

export default {
  name: 'CafeteriaList',
  components: {GenericList},

  data: () => ({
    cafeteriaProps: {
      itemName: 'cafeteria',
      itemDisplayName: '카페테리아',
      domainFields: Cafeteria.fields(),

      initialItems: [
        new Cafeteria({
          id: 1,
          name: '그냥 식당',
          display_name: '그으으으냥 식당',
          support_menu: true,
          support_discount: false,
          support_notification: false
        }),
        new Cafeteria({
          id: 2,
          name: '저냥 식당',
          display_name: '저어어어냥 식당',
          support_menu: true,
          support_discount: false,
          support_notification: false
        })
      ],
      itemGenerator: () => {
        return new Cafeteria({});
      },

      formValidator: (cafeteria, allCafeteria) => {
        return cafeteria.id
        && cafeteria.name
        && cafeteria.display_name
        && !(cafeteria.id in allCafeteria.map((c) => c.id));
      },
      onUpdate: (items) => {
        // When things got changed from client.
        console.log(items);
      }
    }
  }),

  methods: {

  }
}

</script>

<style scoped>

</style>
