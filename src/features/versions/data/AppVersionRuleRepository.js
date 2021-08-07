import GenericRepository from '@/common/GenericRepository';
import AppVersionRule from '@/features/versions/entities/AppVersionRule';

class AppVersionRuleRepository extends GenericRepository {
  async getAllVersionRules() {
    return this.query('GetAllVersionRules', 'allVersionRules', AppVersionRule);
  }

  async addVersionRule(rule) {
    return this.mutate('AddVersionRule', 'createVersionRule', [
      {
        name: 'rule',
        type: 'AppVersionRuleInput',
        value: rule.filter(AppVersionRule.fields().map(f => f.name)),
      },
    ]);
  }

  async updateVersionRule(rule) {
    return this.mutate('UpdateVersionRule', 'updateVersionRule', [
      {
        name: 'rule',
        type: 'AppVersionRuleInput',
        value: rule.filter(AppVersionRule.fields().map(f => f.name)),
      },
    ]);
  }

  async deleteVersionRule(rule) {
    return this.mutate('DeleteVersionRule', 'deleteVersionRule', [
      {
        name: 'ruleId',
        type: 'Int',
        value: rule.id,
      },
    ]);
  }
}

const appVersionRuleRepository = new AppVersionRuleRepository();

export default appVersionRuleRepository;
