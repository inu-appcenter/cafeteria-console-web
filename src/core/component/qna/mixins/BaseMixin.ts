import Vue from 'vue';
import GenericMixin from '@/core/component/common/mixins/GenericMixin';

export default Vue.extend({
  mixins: [GenericMixin],

  props: {
    // questionClass 대신 기본 entityClass 사용합니당.
    answerClass: {
      type: Function, // 사실 함수 아니고 BaseEntity의 생성자...
      required: true,
    },
    valueMapper: {
      type: Function,
      required: true,
    },
  },

  data() {
    const answerClass = this.$props.answerClass;
    const answerMeta = answerClass.metadata();

    return {
      answerMeta,

      onWriteAnswer: answer => answer.save(),
      answerGenerator: () => new answerClass(),

      answerNowEditing: new answerClass(),
      answerBeforeEdit: null,
      editAnswerDialogTitle: null,
      editAnswerDialogVisible: false,
      currentlyAnsweringQuestion: null,
    };
  },

  methods: {
    isThisANewAnswer() {
      return this.answerNowEditing[this.keyName] == null;
    },

    backupAnswer() {
      this.answerBeforeEdit = this.answerNowEditing;
    },

    restoreAnswer() {
      this.answerNowEditing = this.answerBeforeEdit;
    },
  },
});
