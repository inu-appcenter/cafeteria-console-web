<template>
  <v-container fluid>
    <VisitRecordCreation v-bind="visitRecordCreationProps" />
  </v-container>
</template>

<script>
import VisitRecord from '@/features/visit/VisitRecord';
import VisitRecordCreation from '@/features/visit/VisitRecordCreation';

export default {
  name: 'Visit',

  components: {VisitRecordCreation},

  data() {
    return {
      visitRecordCreationProps: {
        entityClass: VisitRecord,
      },
    };
  },
};
</script>

<style scoped></style>
