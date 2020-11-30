<template>
  <GenericList v-bind="ruleProps"/>
</template>

<script>
import GenericList from '@/common/GenericList';
import AppVersionRule from '@/features/versions/entities/AppVersionRule';
import appVersionRuleRepository from '@/features/versions/data/AppVersionRuleRepository';

export default {
  name: 'VersionRuleList',
  components: {GenericList},

  data() {
    return {
      ruleProps: {
        keyName: 'id',
        itemName: 'app_version_rule',
        itemDisplayName: '앱 버전 규칙',
        domainFields: AppVersionRule.fields(),

        itemGenerator: () => {
          return new AppVersionRule({});
        },
        formValidator: () => {
          return true; // Not used here.
        },

        onFetch: async () => appVersionRuleRepository.getAllVersionRules(),
        onAdd: async (item) => appVersionRuleRepository.addVersionRule(item),
        onUpdate: async (item) => appVersionRuleRepository.updateVersionRule(item),
        onDelete: async (item) => appVersionRuleRepository.deleteVersionRule(item)
      }
    }
  }
}
</script>

<style scoped>

</style>
