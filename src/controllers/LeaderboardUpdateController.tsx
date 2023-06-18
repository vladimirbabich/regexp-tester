import { IQuizResult, ITestResult } from '../models/objectModels';

function callApi(
  apiFunction: (apiArgs: any, preferCacheValue?: boolean) => Promise<any>,
  apiArgs: Object,
  responseCallback: (res: any) => void,
  errorCallback: (e: any) => void
) {
  apiFunction(apiArgs)
    .then((res) => {
      responseCallback(res);
    })
    .catch((e) => {
      errorCallback(e);
    });
}

const callbacks = {
  responseUserQuizzes: (
    setResults: React.Dispatch<
      React.SetStateAction<ITestResult[] | IQuizResult[] | undefined>
    >,
    setRecordsAmount: React.Dispatch<React.SetStateAction<number>>
  ) => {
    return (res: any) => {
      if (res.data.quizzes) {
        setResults(res.data.quizzes);
        setRecordsAmount(res.data.count);
        return;
      }
    };
  },
  errorUserQuizzes: (
    setResults: React.Dispatch<
      React.SetStateAction<ITestResult[] | IQuizResult[] | undefined>
    >
  ) => {
    return (e: any) => {
      console.log(e);
      setResults([]);
    };
  },
  responseTests: (
    setResults: React.Dispatch<
      React.SetStateAction<ITestResult[] | IQuizResult[] | undefined>
    >,
    setRecordsAmount: React.Dispatch<React.SetStateAction<number>>
  ) => {
    return (res: any) => {
      if (res.data.tests) {
        const tableData: ITestResult[] = [...res.data.tests];
        console.log(tableData);
        setRecordsAmount(res.data.count);
        setResults([
          ...tableData.map((el) => {
            const ansDiff = parseFloat(el.ansDiff).toFixed(2);
            const skpDiff =
              el.skpDiff == null ? '-' : parseFloat(el.skpDiff).toFixed(2);
            const createdAt = el.createdAt.split('T')[0];
            const testResult: ITestResult = {
              id: el.id,
              username: el.username,
              score: el.score,
              createdAt,
              timeSpent: el.timeSpent,
              ansCount: el.ansCount,
              ansDiff,
              skpCount: el.skpCount,
              skpDiff,
              version: el.version,
            };
            return testResult;
          }),
        ]);
      } else {
        setRecordsAmount(res.data.count);
        setResults([]);
      }
    };
  },
  errorTests: (
    setResults: React.Dispatch<
      React.SetStateAction<ITestResult[] | IQuizResult[] | undefined>
    >
  ) => {
    return (e: any) => {
      console.log(e);
      setResults([]);
    };
  },
};

export { callbacks, callApi };
