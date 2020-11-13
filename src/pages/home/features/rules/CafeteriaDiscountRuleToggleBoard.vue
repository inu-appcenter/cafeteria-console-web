<template>
  <GenericToggleBoard v-bind="discountRuleStatusesProps"/>
</template>

<script>
import GenericToggleBoard from '@/pages/home/common/GenericToggleBoard';
import CafeteriaDiscountRule from '@/pages/home/features/rules/entities/CafeteriaDiscountRule';

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

        initialItems: [
          new CafeteriaDiscountRule({
            id: 1,
            name: 'requestShouldBeInMealTime',
            description: '할인은 해당 식당이 정하는 시간대에만 허용합니다.',
            enabled: true
          }),
          new CafeteriaDiscountRule({
            id: 2,
            name: 'cafeteriaShouldSupportDiscount',
            description: '해당 식당이 할인을 지원해야 합니다.',
            enabled: true,
          })
        ],
        onUpdate: (allRules) => {
          console.log(allRules);
        }
      }
    };
  }
}
</script>

<style scoped>

</style>
