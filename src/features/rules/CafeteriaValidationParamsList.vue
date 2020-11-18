<template>
  <GenericList v-bind="cafeteriaValidationParamsProps"/>
</template>

<script>
import GenericList from '@/common/GenericList';
import CafeteriaValidationParams from '@/features/rules/entities/CafeteriaValidationParams';
import validationParamsRepository from '@/features/rules/data/ValidationParamsRepository';

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


        itemGenerator: () => {
          return new CafeteriaValidationParams({});
        },
        formValidator: (params, allParams) => {
          return !allParams.find((c) => c.cafeteria_id === params.cafeteria_id); // should not exist.
        },

        onFetch: async () => validationParamsRepository.getAllValidationParams(),
        onAdd: async (item) => validationParamsRepository.addValidationParams(item),
        onUpdate: async (item) => validationParamsRepository.updateValidationParams(item),
        onDelete: async (item) => validationParamsRepository.deleteValidationParams(item)
      }
    };
  }
}
</script>

<style scoped>

</style>
