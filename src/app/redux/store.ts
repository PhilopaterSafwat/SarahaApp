import { UserIdReducer } from './userIdSlice';
import { MessageReducer } from './sendMessage';
import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./userSlice";
import { UserTokenReducer } from './userTokenSlice';
import { deleteMessageReducer } from './deleteMessage';
import { AddFavoriteMessageReducer } from './addFavoriteMessage';

export const store = configureStore({
    reducer: {
        user: UserReducer,
        message: MessageReducer,
        userByid: UserIdReducer,
        token: UserTokenReducer,
        deleteMessage: deleteMessageReducer,
        addFavoriteMessage: AddFavoriteMessageReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;