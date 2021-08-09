<template>
  <GenericToggleBoard v-bind="discountRuleStatusesProps" />
</template>

<script>
import GenericToggleBoard from '@/core/component/toggleboard/GenericToggleBoard';
import DiscountRule from '@/features/rules/DiscountRule';

export default {
  name: 'DiscountRuleToggleBoard',
  components: {GenericToggleBoard},

  data() {
    return {
      discountRuleStatusesProps: {
        entityClass: DiscountRule,

        nameFieldName: 'name',
        toggleFieldName: 'enabled',
        descriptionFieldName: 'description',
      },
    };
  },
};
</script>
