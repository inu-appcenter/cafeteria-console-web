<template>
  <v-container fluid>
    <!-- All version rules -->
    <VersionRuleList />
  </v-container>
</template>

<script>
import VersionRuleList from '@/features/versions/VersionRuleList';

export default {
  name: 'Versions',
  components: {VersionRuleList},
};
</script>

<style scoped></style>
