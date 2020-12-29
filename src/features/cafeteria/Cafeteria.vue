<template>
  <v-container fluid>

    <!-- All cafeteria -->
    <CafeteriaList />

    <!-- All corners -->
    <CornerList />

    <!-- All kiosk numbers -->
    <KioskList />

  </v-container>
</template>

<script>
import CafeteriaList from '@/features/cafeteria/CafeteriaList';
import CornerList from '@/features/cafeteria/CornerList';
import KioskList from '@/features/cafeteria/KioskNumbersList';

export default {
  name: 'Cafeteria',
  components: {CafeteriaList, CornerList, KioskList}
}
</script>

<style scoped>

</style>
