<template>
  <v-container fluid>
    <LogDataTable v-bind="logProps" />

    <FullLogs class="mb-10" />
  </v-container>
</template>

<script>
import FullLogs from '@/features/logs/FullLogs';
import LogDataTable from '@/features/logs/LogDataTable';
import Log from '@/features/logs/Log';

export default {
  name: 'RecentLogs',
  components: {LogDataTable, FullLogs},

  data() {
    return {
      logProps: {
        entityClass: Log,
        order: 'DESC',
      },
    };
  },
};
</script>
