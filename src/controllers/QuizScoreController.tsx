import { QuizQuestion } from '../models/objectModels';

export default class QuizScoreController {
  public score: number;
  public rightAmount: number;
  public partiallyAmount: number;
  public avgDifficulty: number;
  //
  constructor(questions: QuizQuestion[], timeSpent: number = 1) {
    const baseScore = 1; //1
    const pointsOfQuestions = questions.map((question) => {
      if (!question.userAnswer) {
        return 0;
      }

      const [prepAnswers, prepOptions] = [
        question.answers.split('||'),
        question.options.split('||'),
      ];
      //if 1 answer allowed
      if (prepAnswers.length === 1 && question.userAnswer.length === 1) {
        return prepAnswers[0] === question.userAnswer[0] ? 1 : 0;
      }

      const allOptionsAmount = prepAnswers.length + prepOptions.length; //3

      const rightAnswersPicked = prepAnswers.reduce((count, answer) => {
        return question.userAnswer?.includes(answer) ? count + 1 : count;
      }, 0);
      const wrongOptionsPicked = prepOptions.reduce(
        (count, answer) =>
          question.userAnswer?.includes(answer) ? count + 1 : count,
        0
      );

      const penalty = baseScore / allOptionsAmount; //penalty for every wrong pick //0.33

      if (rightAnswersPicked === 0)
        return Number(
          (
            baseScore -
            (wrongOptionsPicked * penalty + prepAnswers.length * penalty)
          ).toFixed(2)
        ); //??? dont check wrong picks
      return Number(
        (
          baseScore -
          (prepAnswers.length - rightAnswersPicked) * penalty -
          wrongOptionsPicked * penalty
        ).toFixed(2)
      );
    });
    this.rightAmount = pointsOfQuestions.reduce(
      (count, points) => (points === baseScore ? ++count : count),
      0
    );
    this.partiallyAmount =
      pointsOfQuestions.reduce(
        (count, points) => (points > 0 ? ++count : count),
        0
      ) - this.rightAmount;
    this.avgDifficulty =
      questions
        .map((question) => question.difficulty)
        .reduce((sum, diff) => (sum += diff), 0) / questions.length;
    this.score = Math.floor(
      100 *
        this.avgDifficulty *
        pointsOfQuestions.reduce((sum, points) => (sum += points), 0)
    );
  }
}
