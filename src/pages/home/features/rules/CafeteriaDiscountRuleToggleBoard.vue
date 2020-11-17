<template>
  <GenericToggleBoard v-bind="discountRuleStatusesProps"/>
</template>

<script>
import GenericToggleBoard from '@/pages/home/common/GenericToggleBoard';
import CafeteriaDiscountRule from '@/pages/home/features/rules/entities/CafeteriaDiscountRule';
import ruleRepository from '@/pages/home/features/rules/data/RuleRepository';

export default {
  name: 'CafeteriaDiscountRuleToggleBoard',
  components: {GenericToggleBoard},

  data() {
    return {
      discountRuleStatusesProps: {
        keyName: 'id',
        nameFieldName: 'name',
        toggleFieldName: 'enabled',
        descriptionFieldName: 'description',

        itemName: 'cafeteria_discount_rule',
        itemDisplayName: '할인 비즈니스 룰',
        domainFields: CafeteriaDiscountRule.fields(),

        onFetch: async () => ruleRepository.getAllRules(),
        onUpdate: async (item) => ruleRepository.updateRule(item)
      }
    };
  }
}
</script>

<style scoped>

</style>
