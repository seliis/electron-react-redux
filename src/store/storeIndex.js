import {
    configureStore,
    combineReducers
} from "@reduxjs/toolkit"

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist"

// this variable must declare "storage" or occur error
import storage from "redux-persist/lib/storage"

// store
import storeApp from "./storeApp"

export const Store = configureStore({
    reducer: persistReducer(
        {
            key: "root",
            version: 1,
            storage
        },
        combineReducers(
            {
                app: storeApp
            }
        )
    ),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        }
    )
})

export const Persistor = persistStore(
    Store
)