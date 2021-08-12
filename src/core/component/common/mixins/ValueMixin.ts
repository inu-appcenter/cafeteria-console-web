import Vue from 'vue';

/**
 * 값(value)을 가지는 mixin.
 */
export default Vue.extend({
  props: {
    value: {
      required: true,
    },
  },
});
