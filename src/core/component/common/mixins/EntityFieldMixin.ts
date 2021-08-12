import Vue from 'vue';

/**
 * 엔티티 필드 메타데이터를 가지는 mixin.
 */
export default Vue.extend({
  props: {
    field: {
      type: Object,
      required: true,
    },
  },
});
