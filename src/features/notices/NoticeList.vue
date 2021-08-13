<template>
  <GenericList v-bind="noticeProps" />
</template>

<script>
import GenericList from '@/core/component/list/GenericList';
import Notice from '@/features/notices/Notice';

export default {
  name: 'NoticeList',
  components: {GenericList},

  data() {
    return {
      noticeProps: {
        entityClass: Notice,

        formValidator: () => {
          return true; // 안써요 여기선
        },
      },
    };
  },
};
</script>

<style scoped></style>
