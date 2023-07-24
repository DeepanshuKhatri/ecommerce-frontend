import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from '../slice/user.slice'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
    key: 'root',
    version:1,
    storage
}
const reducers = combineReducers({
    user:userReducer
})
const persist  = persistReducer(persistConfig, reducers)
export const store = configureStore({
    reducer:persist
})
export default store;
export const persister = persistStore(store);