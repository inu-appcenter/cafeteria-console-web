<!--
  - This file is part of INU Cafeteria.
  -
  - Copyright 2022 INU Global App Center <potados99@gmail.com>
  -
  - INU Cafeteria is free software: you can redistribute it and/or modify
  - it under the terms of the GNU General Public License as published by
  - the Free Software Foundation, either version 3 of the License, or
  - (at your option) any later version.
  -
  - INU Cafeteria is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU General Public License for more details.
  -
  - You should have received a copy of the GNU General Public License
  - along with this program.  If not, see <https://www.gnu.org/licenses/>.
  -->

<template>
  <GenericQnABoard v-bind="qnaProps" />
</template>

<script lang="ts">
import GenericQnABoard from '@/core/component/qna/GenericQnABoard.vue';
import {ValueMapper} from '@/core/component/qna/ValueMapper';
import Question from '@/features/questions/Question';
import Answer from '@/features/questions/Answer';

export default {
  name: 'QnAList',
  components: {GenericQnABoard},

  data() {
    const valueMapper: ValueMapper<Question> = question => ({
      question: question,
      questionFields: Question.metadata().fields,
      questionBody: question.content,
      askedAt: question.askedAt,
      askedBy: question.user?.studentId || question.user?.phoneNumber || '질문자 정보 없음',
      answer: question.answer,
      answeredAt: question.answer?.answeredAt,
      answerRead: question.answer?.read,
      answerReadAt: question.answer?.readAt,
    });

    return {
      qnaProps: {
        entityClass: Question,
        answerClass: Answer,
        order: 'DESC',

        valueMapper,
      },
    };
  },
};
</script>
