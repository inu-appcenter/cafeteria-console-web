<template>
  <v-container fluid>

    <!-- All notices -->
    <NoticeList/>

  </v-container>
</template>

<script>
import NoticeList from '@/features/notices/NoticeList';

export default {
  name: 'Notices',
  components: {NoticeList}
}
</script>

<style scoped>

</style>
