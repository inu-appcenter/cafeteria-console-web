<template>
  <GenericList v-bind="cafeteriaValidationParamsProps"/>
</template>

<script>
import GenericList from '@/pages/home/common/GenericList';
import CafeteriaValidationParams from '@/pages/home/features/rules/entities/CafeteriaValidationParams';

export default {
  name: 'CafeteriaValidationParamsList',
  components: {GenericList},

  data() {
    return {
      cafeteriaValidationParamsProps: {
        keyName: 'cafeteria_id',
        itemName: 'cafeteria_validation_params',
        itemDisplayName: '할인 요청 인증 파라미터',
        domainFields: CafeteriaValidationParams.fields(),

        fetchItems: async () => [
          new CafeteriaValidationParams({
            token: 'oiushfiusehfiusej',
            available_meal_types: 6,
            time_range_breakfast: '08:00-10:00',
            time_range_lunch: '11:00-13:00',
            time_range_dinner: '17:00-20:00',
            cafeteria_id: 2,
          })
        ],
        itemGenerator: () => {
          return new CafeteriaValidationParams({});
        },

        // eslint-disable-next-line no-unused-vars
        formValidator: (params, allParams) => {
          return true;
        },
        onUpdate: (items) => {
          // When things got changed from client.
          console.log(items);
        }
      }
    };
  }
}
</script>

<style scoped>

</style>
