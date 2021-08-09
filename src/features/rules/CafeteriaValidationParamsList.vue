<template>
  <GenericList v-bind="cafeteriaValidationParamsProps" />
</template>

<script>
import GenericList from '@/core/component/list/GenericList';
import CafeteriaValidationParams from '@/features/rules/CafeteriaValidationParams';

export default {
  name: 'CafeteriaValidationParamsList',
  components: {GenericList},

  data() {
    return {
      cafeteriaValidationParamsProps: {
        entityClass: CafeteriaValidationParams,

        formValidator: (params, allParams) => {
          return !allParams.find(c => c.cafeteria_id === params.cafeteria_id); // should not exist.
        },
      },
    };
  },
};
</script>
