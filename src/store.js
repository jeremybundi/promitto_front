import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import formReducer from './formSlice';
import authReducer from './loginSlice';

const formPersistConfig = {
  key: 'form',
  storage,
};

const authPersistConfig = {
  key: 'auth',
  storage,
};

const persistedFormReducer = persistReducer(formPersistConfig, formReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
  reducer: {
    form: persistedFormReducer,
    auth: persistedAuthReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor }; // Export both store and persistor
