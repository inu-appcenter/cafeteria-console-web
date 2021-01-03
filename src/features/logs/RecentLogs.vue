<template>
  <v-container fluid>

    <!-- Recent logs -->
    <LogTable v-bind="logProps"/>

    <!-- Full logs -->
    <FullLogs class="mb-10" />

  </v-container>
</template>

<script>
import FullLogs from '@/features/logs/FullLogs';
import LogTable from '@/features/logs/LogTable';
import logRepository from '@/features/logs/data/LogRepository';

export default {
  name: 'RecentLogs',
  components: {LogTable, FullLogs},

  data() {
    return {
      logProps: {
        onFetch: async () => logRepository.getRecentLogs(),
        headers: [
          {text: '날짜', value: 'timestamp', align: 'start'},
          {text: '메시지', value: 'message'},
        ],
        itemDisplayName: '서비스 로그'
      }
    }
  }
}
</script>

<style scoped>

</style>
