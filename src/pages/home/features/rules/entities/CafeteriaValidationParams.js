import GenericItem from '@/pages/home/common/GenericItem';
import Field from '@/pages/home/common/Field';
import validation from '@/pages/home/common/validation';

class CafeteriaValidationParams extends GenericItem {
    constructor({token=null, available_meal_types=null, time_range_breakfast=null, time_range_lunch=null, time_range_dinner=null, cafeteria_id = null}) {
        super({});

        this.cafeteria_id = cafeteria_id; /* primary key */
        this.token = token;
        this.available_meal_types = available_meal_types;

        this.time_range_breakfast = time_range_breakfast;
        this.time_range_lunch = time_range_lunch;
        this.time_range_dinner = time_range_dinner;
    }

    static fields() {
        function shouldBeValidTimeRangeString(timeRangeString) {
            return /^[0-2][0-9]:[0-5][0-9]-[0-2][0-9]:[0-5][0-9]$/.test(timeRangeString) || 'Should be in \'mm:hh-mm:hh\' format.';
        }

        function availableMealTypeShouldBeValid(mealType) {
            return (validation.number(mealType) && mealType >= 0 && mealType <= 7) || 'From 0 to 7.';
        }

        return [
            new Field('cafeteria_id', 'number', false, validation.numberOverZero),
            new Field('token', 'text', true, validation.stringNotEmpty),
            new Field('available_meal_types', 'number', true, availableMealTypeShouldBeValid),

            new Field('time_range_breakfast', 'text', true, shouldBeValidTimeRangeString),
            new Field('time_range_lunch', 'text', true, shouldBeValidTimeRangeString),
            new Field('time_range_dinner', 'text', true, shouldBeValidTimeRangeString),
        ];
    }
}

export default CafeteriaValidationParams;
