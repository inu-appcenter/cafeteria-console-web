<template>
  <v-container fluid>
    <!-- All discount rules -->
    <CafeteriaDiscountRuleToggleBoard />

    <!-- All validation params -->
    <CafeteriaValidationParamsList />
  </v-container>
</template>

<script>
import CafeteriaValidationParamsList from '@/features/rules/CafeteriaValidationParamsList';
import CafeteriaDiscountRuleToggleBoard from '@/features/rules/CafeteriaDiscountRuleToggleBoard';

export default {
  name: 'Rules',
  components: {CafeteriaDiscountRuleToggleBoard, CafeteriaValidationParamsList},
};
</script>

<style scoped></style>
