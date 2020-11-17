<template>
  <v-container fluid>

    <!-- All cafeteria -->
    <v-row justify="center">
      <v-col cols="12" lg="4">
        <ParsingRegexList/>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import ParsingRegexList from '@/pages/home/features/parsing/ParsingRegexList';

export default {
  name: 'Parsing',
  components: {ParsingRegexList}
}
</script>

<style scoped>

</style>
