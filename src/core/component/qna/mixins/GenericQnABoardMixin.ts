import Vue from 'vue';
import BaseMixin from '@/core/component/qna/mixins/BaseMixin';

export default Vue.extend({
  mixins: [BaseMixin],

  props: {
    questionBodyFieldName: {
      type: String,
      required: true,
    },
    questionDateFieldName: {
      type: String,
      required: true,
    },
    answerIdFieldName: {
      type: String,
      required: true,
    },

    answerTitleFieldName: {
      type: String,
      required: true,
    },
    answerBodyFieldName: {
      type: String,
      required: true,
    },
  },
});
