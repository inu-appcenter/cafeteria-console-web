<template>
  <v-container fluid>

    <!-- All cafeteria -->
    <v-row justify="center">
      <v-col cols="12" lg="12" md="8" sm="10" xm="12">
        <CafeteriaList />
      </v-col>
    </v-row>

    <!-- All corners -->
    <v-row justify="center">
      <v-col cols="12" lg="12" md="8" sm="10" xm="12">
        <CornerList  />
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import CafeteriaList from '@/features/cafeteria/CafeteriaList';
import CornerList from '@/features/cafeteria/CornerList';

export default {
  name: 'Cafeteria',
  components: {CornerList, CafeteriaList}
}

</script>

<style scoped>

</style>
