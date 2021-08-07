import GenericRepository from '@/common/GenericRepository';
import Question from '@/features/questions/entities/Question';
import Answer from '@/features/questions/entities/Answer';

class InteractionRepository extends GenericRepository {
  async getAllQuestions() {
    return this.nestedQuery(
      'GetAllQuestions',
      'allQuestions',
      [
        {
          name: 'answer',
          props: Answer.fields().map(f => f.name),
        },
      ],
      Question,
    );
  }

  async answerQuestion(questionId, answer) {
    return this.mutate('AnswerQuestion', 'answerQuestion', [
      {
        name: 'questionId',
        type: 'Int',
        value: questionId,
      },
      {
        name: 'answer',
        type: 'AnswerInput',
        value: {
          title: answer.title,
          body: answer.body,
        },
      },
    ]);
  }

  async updateAnswer(questionId, answer) {
    return this.mutate('UpdateAnswer', 'updateAnswer', [
      {
        name: 'questionId',
        type: 'Int',
        value: questionId,
      },
      {
        name: 'answer',
        type: 'AnswerInput',
        value: {
          title: answer.title,
          body: answer.body,
        },
      },
    ]);
  }

  async deleteAnswer(questionId) {
    return this.mutate('DeleteAnswer', 'deleteAnswer', [
      {
        name: 'questionId',
        type: 'Int',
        value: questionId,
      },
    ]);
  }
}

const interactionRepository = new InteractionRepository();

export default interactionRepository;
