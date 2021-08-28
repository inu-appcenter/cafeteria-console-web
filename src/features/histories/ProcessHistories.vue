<template>
  <HistoryDataTable v-bind="historyProps" />
</template>

<script>
import HistoryDataTable from '@/features/histories/HistoryDataTable';
import DiscountProcessHistory from '@/features/histories/DiscountProcessHistory';

export default {
  name: 'ProcessHistories',
  components: {HistoryDataTable},

  data() {
    return {
      historyProps: {
        entityClass: DiscountProcessHistory,
        order: 'DESC',

        failureColor: failure => (failure === 0 ? 'green' : 'red'),
      },
    };
  },
};
</script>
