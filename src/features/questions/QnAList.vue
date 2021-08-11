<template>
  <GenericQnABoard v-bind="qnaProps" />
</template>

<script>
import GenericQnABoard from '@/common/GenericQnABoard';
import interactionRepository from '@/features/questions/data/InteractionRepository';
import Answer from '@/features/questions/entities/Answer';
import Field from '@/common/Field';

export default {
  name: 'QnAList',
  components: {GenericQnABoard},

  data() {
    return {
      qnaProps: {
        questionKeyName: 'id',
        answerKeyName: 'id',
        emptyText: '접수된 문의가 없습니다.',
        itemDisplayName: '문의 및 답변 내역',
        answerGenerator: () => new Answer({}),

        questionAuthorFieldName: 'user_id',
        questionContentFieldName: 'content',
        questionDateFieldName: 'date',
        otherQuestionFields: [
          new Field('device_info', 'text', false, true).apply(f => {
            f.displayName = '기기 정보';
          }),
          new Field('version', 'text', false, true).apply(f => {
            f.displayName = '앱 버전';
          }),
        ],

        answerIdFieldName: 'answer',
        answerTitleFieldName: 'title',
        answerBodyFieldName: 'body',

        onFetch: () => interactionRepository.getAllQuestions(),
        onAnswer: (questionsId, answer) => interactionRepository.answerQuestion(questionsId, answer),
        onUpdateAnswer: (questionsId, answer) => interactionRepository.updateAnswer(questionsId, answer),
        onDeleteAnswer: questionsId => interactionRepository.deleteAnswer(questionsId),
      },
    };
  },
};
</script>

<style scoped></style>
