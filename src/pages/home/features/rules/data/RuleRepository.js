import GenericRepository from '@/data/GenericRepository';
import CafeteriaDiscountRule from '@/pages/home/features/rules/entities/CafeteriaDiscountRule';

class RuleRepository extends GenericRepository {

    async getAllRules() {
        return this.query('GetAllRules', 'allRules', CafeteriaDiscountRule);
    }

    async updateRule(rule) {
        return this.mutate('UpdateRule', 'updateRule', [
            {
                name: 'rule',
                type: 'CafeteriaDiscountRuleInput',
                value: rule.filter(['id', 'enabled']),
            }
        ]);
    }
}

const ruleRepository = new RuleRepository();

export default ruleRepository;
