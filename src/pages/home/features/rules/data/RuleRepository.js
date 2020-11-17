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
                value: rule.filter(CafeteriaDiscountRule.fields().map((f) => f.name)),
            }
        ]);
    }
}

const ruleRepository = new RuleRepository();

export default ruleRepository;
