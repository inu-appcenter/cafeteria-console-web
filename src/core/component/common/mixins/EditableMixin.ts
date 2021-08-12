import Vue from 'vue';
import ValueMixin from '@/core/component/common/mixins/ValueMixin';

/**
 * 값(value)을 편집할 수 있는 mixin.
 */
export default Vue.extend({
  mixins: [ValueMixin],

  props: {
    editing: {
      type: Boolean,
      required: false,
    },
  },

  methods: {
    /**
     * input 이벤트에 대해 이 update를 호출해 주세요.
     */
    update(newValue) {
      this.$emit('input', newValue);
    },
  },
});
