<template>
  <v-container fluid>
    <QnAList />
  </v-container>
</template>

<script>
import QnAList from '@/features/questions/QnAList';

export default {
  name: 'Questions',
  components: {QnAList},
};
</script>

<style scoped></style>
