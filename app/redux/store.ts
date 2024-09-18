import { configureStore } from "@reduxjs/toolkit";
import todosSliceReducer  from "./todosSlice";

export const store = configureStore({
    reducer: {
        todos: todosSliceReducer ,
    }
});