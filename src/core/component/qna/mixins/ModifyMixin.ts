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

      if (success) {
        // Question 엔티티 속에서 answer 필드의 이름은,
        // 필드 중 엔티티 클래스가 answerClass인 것의 이름으로 알아냅니다.
        const answerFieldName = this.meta.fields.find(f => f.entityClass === this.answerClass).name;

        this.currentlyAnsweringQuestion[answerFieldName] = this.answerNowEditing;
      }
    },

    onClickCancelWriteAnswer() {
      this.editAnswerDialogVisible = false;

      if (this.isThisANewAnswer()) {
        // 아무것도 안해용.
      } else {
        this.restoreAnswer();
      }
    },
  },
});
