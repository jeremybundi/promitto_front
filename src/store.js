// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage for persistence
import formReducer from './formSlice'; // Your form slice

// Persist config for redux-persist
const persistConfig = {
  key: 'root', // Key in storage
  storage,     // Default storage is localStorage
};

// Wrap formReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, formReducer);

const store = configureStore({
  reducer: {
    form: persistedReducer, // Use the persisted reducer
  },
});

// Export the persistor object as well
export const persistor = persistStore(store);

export default store;
