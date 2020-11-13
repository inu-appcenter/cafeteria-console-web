<template>
  <GenericList v-bind="cornerProps" />
</template>
<script>

import Corner from '@/pages/home/features/cafeteria/entities/Corner';
import GenericList from '@/pages/home/common/GenericList';

export default {
  name: 'CornerList',
  components: {GenericList},

  data: () => ({
    cornerProps: {
      keyName: 'id',
      itemName: 'corner',
      itemDisplayName: '코너',
      domainFields: Corner.fields(),

      initialItems: [
        new Corner({
          id: 1,
          name: '그 코너',
          display_name: '딸려있는 코너',
          available_at: 6,
          cafeteria_id: 1
        }),
        new Corner({
          id: 2,
          name: '그 코너 두번째',
          display_name: '딸려있는 그 코너',
          available_at: 6,
          cafeteria_id: 1
        }),
      ],
      itemGenerator: () => {
        return new Corner({});
      },

      formValidator: () => {
        return true;
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
