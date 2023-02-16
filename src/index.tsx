import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Reducer, ReducersMapObject } from "redux";

// type ActionType = {
//   type: string;
//   payload: Object;
// };

// const defaultState = false; //isTestMode

// const TESTreducer = Reducer<boolean, ActionType> | ReducersMapObject<boolean, ActionType>(state: boolean, action: ActionTyp) => {
//   switch (action.type) {
//     case "UPDATE":
//       return !state;
//     default:
//       return state;
//   }
// };

// interface ConfigureStoreOptions<S = boolean, A = ActionType> {
//   reducer: Reducer<boolean, ActionType> | ReducersMapObject<boolean, ActionType>
// }
// function configureStore<S = boolean, A = ActionType>(
//   options: ConfigureStoreOptions<S, A>
// ): EnhancedStore<S, A>;
// const store = configureStore({
//   reducer:{
//     test1: TESTreducer,
//   },
// })

///
// const store = configureStore({ reducer: reducer });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
