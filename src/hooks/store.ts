import {configureStore} from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import authReducer from "../features/authSlice"
import {setupListeners} from "@reduxjs/toolkit/query/react"
import { useDispatch } from "react-redux";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)

export const useAppDispatch: () => AppDispatch = useDispatch