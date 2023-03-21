import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { IQuestion } from '../types';
import './../App.scss';
import './../styles/Analyzer.scss';
import QuestionBlock from './QuestionBlock';
export default function Analyzer({ title }: any) {
  const askedQuestions = useAppSelector(
    (state) => state.testForm.askedQuestions
  );

  const testData: IQuestion[] = [
    {
      difficulty: 5,
      expectedResult: 'L|o|r|e|m|i|p|S|u|M',
      functionName: 'match',
      id: 4,
      possibleAnswer: '[a-z]',
      task: "get all letters by using flag 'i'",
      text: 'Lorem 1234 @$#! ipSuM',
      userAnswer: '[a-z]/gi',
    },
    {
      difficulty: 5,
      expectedResult: '1|5|5|5|2|3|4|5|6|7|8',
      functionName: 'match',
      id: 4,
      possibleAnswer: '[0-9]',
      task: "get all digits",
      text: '+1(555)234-56-78',
    },
    {
      text: 'text3',
      expectedResult: 'expRes3',
      task: 'task3',
      possibleAnswer: 'posAnswer',
      difficulty: 5,
      id: 1,
      functionName: 'match',
      userAnswer: 'userAnswer',
    },
  ];

  return (
    <div className="analyzer">
      <h1 className="title">{title}</h1>
      {testData.map((question, i) => (
        <QuestionBlock question={question} questionId={i+1}></QuestionBlock>
      ))}
    </div>
  );
}