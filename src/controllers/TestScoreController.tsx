import { AskedQuestion } from '../models/objectModels';

export default class TestScoreController {
  public score: number;
  public ansCount: number;
  public ansDiff: number | string;
  public skpCount: number;
  public skpDiff: number | string;
  constructor(questions: AskedQuestion[], timeSpent: number = 1) {
    console.log('timeSpent');
    console.log(typeof timeSpent);
    console.log(timeSpent);
    const SKIP_PENALTY_DIVIDER = 4;
    const BASE_NO_SKIP_BONUS = -10;

    const ansScore = this.getScoreValues(
      questions,
      (accum: number, el: AskedQuestion) => (el.userAnswer ? ++accum : accum),
      (accum: number, el: AskedQuestion) =>
        el.userAnswer ? accum + el.difficulty : accum
    );
    const skpScore = this.getScoreValues(
      questions,
      (accum: number, el: AskedQuestion) => (!el.userAnswer ? ++accum : accum),
      (accum: number, el: AskedQuestion) =>
        !el.userAnswer ? accum + el.difficulty : accum
    );
    this.ansCount = ansScore.count;
    this.ansDiff =
      ansScore.avgDiff === 0 ? '-' : Number(ansScore.avgDiff.toFixed(2));
    this.skpCount = skpScore.count;
    this.skpDiff =
      skpScore.avgDiff === 0 ? '-' : Number(skpScore.avgDiff.toFixed(2));

    console.log('ansScore:');
    console.log(ansScore);
    console.log('skpScore:');
    console.log(skpScore);

    if (skpScore.count === 0) {
      skpScore.score = BASE_NO_SKIP_BONUS * ansScore.multiplier;
    }
    const questionScore =
      skpScore.count === 0
        ? (ansScore.score - skpScore.score) * 100
        : (ansScore.score - skpScore.score / SKIP_PENALTY_DIVIDER) * 100;
    console.log('score:');
    console.log(questionScore, timeSpent);
    console.log(questionScore / timeSpent);
    console.log(questionScore / timeSpent);
    console.log((questionScore / timeSpent) * ansScore.avgDiff);
    console.log(
      (questionScore / timeSpent) * ansScore.avgDiff * ansScore.avgDiff
    );

    this.score =
      (questionScore / timeSpent) * ansScore.avgDiff * ansScore.avgDiff;
  }

  getScoreValues(
    testQuestions: AskedQuestion[],
    callbackCounter: (accum: number, el: AskedQuestion) => number,
    callbackSumDiff: (accum: number, el: AskedQuestion) => number
  ) {
    const initialValue = 0;
    const DIFF_MULTIPLIERS = [0, 1, 3, 6, 8, 12, 25, 35, 50, 65, 90];
    const count = testQuestions.reduce(callbackCounter, initialValue);
    const sumDiff = testQuestions.reduce(callbackSumDiff, initialValue);

    const diff = sumDiff / count;
    const avgDiff = diff ? diff : 0;
    const multiplier = avgDiff ? count * avgDiff : 0;
    const scoreForOneQuestion =
      (avgDiff ? avgDiff : 0) *
      DIFF_MULTIPLIERS[Math.round(avgDiff ? avgDiff : 0)];

    return {
      score: scoreForOneQuestion * count * count,
      count,
      avgDiff,
      multiplier,
    };
  }
}
