import { configureStore } from "@reduxjs/toolkit";
import fileSystemReducer from "../features/fileSystem/fileSystemSlice";

export const store = configureStore({
  reducer: {
    fileSystem: fileSystemReducer,
  },
});
