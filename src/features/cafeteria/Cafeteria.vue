<template>
  <v-container fluid>
    <!-- All cafeteria -->
    <CafeteriaList />

    <!-- All corners -->
    <CornerList />
  </v-container>
</template>

<script>
import CafeteriaList from '@/features/cafeteria/CafeteriaList';
import CornerList from '@/features/cafeteria/CornerList';

export default {
  name: 'Cafeteria',
  components: {CafeteriaList, CornerList},
};
</script>

<style scoped></style>
