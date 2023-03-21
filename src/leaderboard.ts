import { IRecordData } from './types';

const testData: IRecordData = {
  min5: [
    {
      id: 1,
      userName: 'min5',
      solvedAmount: 15,
      skippedAmount: 3,
    },
    {
      id: 2,
      userName: 'Jane',
      solvedAmount: 22,
      skippedAmount: 14,
    },
    {
      id: 3,
      userName: 'Frank',
      solvedAmount: 3,
      skippedAmount: 12,
    },
    {
      id: 4,
      userName: 'Robert',
      solvedAmount: 3,
      skippedAmount: 2,
    },
  ],
  noflags: [
    {
      id: 1,
      userName: 'noflags',
      solvedAmount: 15,
      skippedAmount: 3,
      timeSpent: 645,
    },
    {
      id: 2,
      userName: '234',
      solvedAmount: 22,
      skippedAmount: 14,
      timeSpent: 12252,
    },
    {
      id: 3,
      userName: '345',
      solvedAmount: 3,
      skippedAmount: 12,
      timeSpent: 4332,
    },
    {
      id: 4,
      userName: '431',
      solvedAmount: 3,
      skippedAmount: 2,
      timeSpent: 5000,
    },
  ],
  all: [
    {
      id: 1,
      userName: 'all',
      solvedAmount: 15,
      skippedAmount: 3,
      timeSpent: 645,
    },
    {
      id: 2,
      userName: 'Jane',
      solvedAmount: 22,
      skippedAmount: 14,
      timeSpent: 12252,
    },
    {
      id: 3,
      userName: 'Frank',
      solvedAmount: 3,
      skippedAmount: 12,
      timeSpent: 4332,
    },
    {
      id: 4,
      userName: 'Robert',
      solvedAmount: 3,
      skippedAmount: 2,
      timeSpent: 5000,
    },
  ],
};
export { testData };
