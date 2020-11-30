<template>
  <GenericList v-bind="noticeProps"/>
</template>

<script>

import Notice from '@/features/notices/entities/Notice';
import noticeRepository from '@/features/notices/data/NoticeRepository';
import GenericList from '@/common/GenericList';

export default {
  name: 'NoticeList',
  components: {GenericList},

  data() {
    return {
      noticeProps: {
        keyName: 'id',
        itemName: 'notice',
        itemDisplayName: '공지',
        domainFields: Notice.fields(),

        itemGenerator: () => {
          return new Notice({});
        },
        formValidator: () => {
          return true // Not used here.
        },

        onFetch: async () => noticeRepository.getAllNotices(),
        onAdd: async (item) => noticeRepository.addNotice(item),
        onUpdate: async (item) => noticeRepository.updateNotice(item),
        onDelete: async (item) => noticeRepository.deleteNotice(item)
      }
    };
  }


}
</script>

<style scoped>

</style>
