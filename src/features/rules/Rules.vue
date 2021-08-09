<template>
  <v-container fluid>
    <DiscountRuleToggleBoard />

    <CafeteriaValidationParamsList />
  </v-container>
</template>

<script>
import DiscountRuleToggleBoard from '@/features/rules/DiscountRuleToggleBoard';
import CafeteriaValidationParamsList from '@/features/rules/CafeteriaValidationParamsList';

export default {
  name: 'Rules',
  components: {DiscountRuleToggleBoard, CafeteriaValidationParamsList},
};
</script>
