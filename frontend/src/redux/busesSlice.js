import { createSlice } from "@reduxjs/toolkit";

const busesSlice = createSlice({
    name: "buses",
    initialState: {
        buses: [],
    },
    reducers: {
        setBusesInStore: (state, action) => {
            state.buses = action.payload;
        },
    },
});

export const { setBusesInStore } = busesSlice.actions;

export default busesSlice.reducer;