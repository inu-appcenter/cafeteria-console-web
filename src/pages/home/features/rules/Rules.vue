<template>
  <v-container fluid>

    <!-- All cafeteria -->
    <v-row justify="center">
      <v-col cols="12" lg="4">
        <CafeteriaValidationParamsList />
      </v-col>
    </v-row>

    <!-- All corners -->
    <v-row justify="center">
      <v-col cols="12" lg="4">
        <CafeteriaValidationParamsList />
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import CafeteriaValidationParamsList from '@/pages/home/features/rules/CafeteriaValidationParamsList';

export default {
  name: 'Rules',
  components: {CafeteriaValidationParamsList}
}
</script>

<style scoped>

</style>
