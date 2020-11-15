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

        fetchItems: async () => [
          new CafeteriaDiscountRule({
            id: 1,
            name: 'requestShouldBeInMealTime',
            description: '요청 시각이 해당 식당이 할인을 지원하는 시간대에 속해야 합니다.',
            enabled: true
          }),
          new CafeteriaDiscountRule({
            id: 2,
            name: 'cafeteriaShouldSupportDiscount',
            description: '해당 식당이 할인을 지원해야 합니다.',
            enabled: true,
          }),
          new CafeteriaDiscountRule({
            id: 3,
            name: 'userShouldExist',
            description: '할인받고자 하는 사용자가 존재해야 합니다.',
            enabled: true,
          })
        ],
        onUpdate: (allRules) => {
          allRules;

          return new Promise((resolve, reject) => {
            setTimeout(() =>{
              reject;
              resolve();
            }, 600);
          });

        }
      }
    };
  }
}
</script>

<style scoped>

</style>
