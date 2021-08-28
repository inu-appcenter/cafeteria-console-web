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
