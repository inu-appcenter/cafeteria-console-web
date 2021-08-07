<template>
  <!-- Recent transaction histories -->
  <HistoryTable v-bind="transactionHistoryProps" />
</template>

<script>
import HistoryTable from '@/features/histories/HistoryTable';
import transactionHistoryRepository from '@/features/histories/data/TransactionHistoryRepository';

export default {
  name: 'TransactionHistories',
  components: {HistoryTable},

  data() {
    return {
      transactionHistoryProps: {
        onFetch: async () => transactionHistoryRepository.getAllTransactionHistories(),
        failureColor: failure => (failure === 0 ? 'green' : 'red'),
        headers: [
          {text: '날짜', value: 'timestamp', align: 'start'},
          {text: '유형(Validate | Commit | Cancel)', value: 'type'},
          {text: '학번', value: 'user_id'},
          {text: '식당 코드', value: 'cafeteria_id'},
          {text: '식사 시간(4 | 2 | 1)', value: 'meal_type'},
          {text: '결과 코드', value: 'failed_at'},
          {text: '메시지', value: 'message'},
        ],
        itemDisplayName: '바코드 태그 기록',
      },
    };
  },
};
</script>

<style scoped></style>
