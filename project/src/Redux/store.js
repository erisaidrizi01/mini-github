import { configureStore } from "@reduxjs/toolkit";
// import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "./Reducers/index";

const store = configureStore({ reducer: reducers, middleware: [thunk] });

export default store;
