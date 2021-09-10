<template>
  <GenericToggleBoard v-bind="checkInRuleStatusesProps" />
</template>

<script>
import GenericToggleBoard from '@/core/component/toggleboard/GenericToggleBoard';
import CheckInRule from '@/features/booking/CheckInRule';

export default {
  name: 'CheckInRuleToggleBoard',
  components: {GenericToggleBoard},

  data() {
    return {
      checkInRuleStatusesProps: {
        entityClass: CheckInRule,

        nameFieldName: 'name',
        toggleFieldName: 'enabled',
        descriptionFieldName: 'description',
      },
    };
  },
};
</script>
