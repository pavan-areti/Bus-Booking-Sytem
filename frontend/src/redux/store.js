import { configureStore,combineReducers } from "@reduxjs/toolkit";

import alertSlice from "./alertsSlice";
import usersSlice from "./usersSlice";
import busesSlice from "./busesSlice";

const rootReducer = combineReducers({
    alerts: alertSlice,
    users: usersSlice,
    buses: busesSlice,
});

const store = configureStore({
    reducer: rootReducer,
});


export default store;