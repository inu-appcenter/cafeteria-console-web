import Vue from 'vue';
import BaseMixin from '@/core/component/qna/mixins/BaseMixin';

export default Vue.extend({
  mixins: [BaseMixin],

  methods: {
    onClickWriteAnswer(question, existingAnswer) {
      this.currentlyAnsweringQuestion = question;
      this.answerNowEditing = existingAnswer || this.answerGenerator();
      this.backupAnswer();

      this.editAnswerDialogTitle = existingAnswer ? '답변 수정' : '답변 등록';
      this.editAnswerDialogVisible = true;
    },

    onModifyAnswer() {
      this.answerNowEditing.valid = this.isItemValid(this.answerNowEditing);
      this.answerNowEditing.modified = true;
    },

    async onClickDoneWriteAnswer() {
      this.editAnswerDialogVisible = false;
      this.answerNowEditing.modified = false;
      this.answerNowEditing.questionId = this.currentlyAnsweringQuestion.id; // TODO 직접대입 말고 다른 방법 찾자..ㅠ

      this.currentlyAnsweringQuestion.loading = true;
      const success = await this.showResult(this.onWriteAnswer(this.answerNowEditing), '반영되었습니다.');
      this.currentlyAnsweringQuestion.loading = false;

      if (success && this.isThisANewAnswer()) {
        // 잘 됐고 새 답변이면 그냥 새로고침합니다.
        await this.load();
      }
    },

    onClickCancelWriteAnswer() {
      this.editAnswerDialogVisible = false;

      if (this.isThisAnExistingAnswer()) {
        this.restoreAnswer();
      } else {
        // 아무것도 안해용.
      }
    },
  },
});
