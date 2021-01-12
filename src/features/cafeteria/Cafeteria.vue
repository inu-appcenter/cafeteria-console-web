<template>
  <v-container fluid>

    <!-- All cafeteria -->
    <CafeteriaList />

    <!-- All corners -->
    <CornerList />

    <!-- All comments -->
    <CommentList />

    <!-- All kiosk numbers -->
    <KioskList />

  </v-container>
</template>

<script>
import CafeteriaList from '@/features/cafeteria/CafeteriaList';
import CornerList from '@/features/cafeteria/CornerList';
import CommentList from '@/features/cafeteria/CommentList';
import KioskList from '@/features/cafeteria/KioskNumbersList';

export default {
  name: 'Cafeteria',
  components: {CafeteriaList, CornerList, CommentList, KioskList}
}
</script>

<style scoped>

</style>
