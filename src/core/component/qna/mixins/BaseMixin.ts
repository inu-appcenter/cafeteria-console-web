import Vue from 'vue';
import GenericMixin from '@/core/component/common/mixins/GenericMixin';
import {classToClass} from 'class-transformer';

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

    isThisAnExistingAnswer() {
      return !this.isThisANewAnswer();
    },

    backupAnswer() {
      // answerBeforeEdit 인스턴스는 레퍼런스가 하나밖에 없어야 합니다.
      // 그래서 deep copy로 백업합니다.
      this.answerBeforeEdit = classToClass(this.answerNowEditing);
    },

    restoreAnswer() {
      // answerNowEditing 인스턴스는 여기저기 엮인 레퍼런스가 많습니다.
      // 인스턴스 자체는 유지하면서 내용만 바꿔주어야 합니다.
      Object.assign(this.answerNowEditing, this.answerBeforeEdit);
    },
  },
});
