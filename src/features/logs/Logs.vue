<template>
  <v-container fill-height fluid>

    <!-- All transaction histories -->
    <TransactionHistories />

    <!-- Full logs -->
    <FullLogs class="mb-10" />

  </v-container>
</template>

<script>
import FullLogs from '@/features/logs/FullLogs';
import TransactionHistories from '@/features/logs/TransactionHistories';

export default {
  name: 'Logs',
  components: {TransactionHistories, FullLogs}
}
</script>

<style scoped>

</style>

