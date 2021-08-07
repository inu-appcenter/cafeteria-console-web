<template>
  <v-container fluid>
    <!-- All cafeteria -->
    <ParsingRegexList />
  </v-container>
</template>

<script>
import ParsingRegexList from '@/features/parsing/ParsingRegexList';

export default {
  name: 'Parsing',
  components: {ParsingRegexList},
};
</script>

<style scoped></style>
