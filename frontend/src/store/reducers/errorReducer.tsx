import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    getErrors: (_state, action: PayloadAction<any>) => { 
        return action.payload; 
    },
    clearErrors: () => {
        return {};
    }
  }
});

export const { getErrors, clearErrors } = errorSlice.actions;
export default errorSlice.reducer;

