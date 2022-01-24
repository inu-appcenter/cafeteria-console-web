/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2022 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
