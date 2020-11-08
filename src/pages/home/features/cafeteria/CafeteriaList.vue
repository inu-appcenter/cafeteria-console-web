<template>
  <GenericList v-bind="cafeteriaProps" ></GenericList>
</template>
<script>

import Field from '@/pages/home/features/cafeteria/Field';
import Cafeteria from '@/pages/home/features/cafeteria/entity/Cafeteria';
import GenericList from '@/pages/home/features/cafeteria/GenericList';

export default {
  name: 'CafeteriaList',
  components: {GenericList},

  data: () => ({
    cafeteriaProps: {
      itemName: 'cafeteria',
      itemDisplayName: '카페테리아',
      domainFields: [
          new Field('id', 'number', false),
          new Field('name', 'text', true),
          new Field('display_name', 'text', true),
          new Field('support_menu', 'bool', true),
          new Field('support_discount', 'bool', true),
          new Field('support_notification', 'bool', true)
      ],
      formValidator: () => {
        return true;
      },
      itemGenerator: () => {
        return new Cafeteria({});
      },
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
      onUpdate: (items) => {
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
