import React, { useContext } from 'react';
import { ITasksPersistentStorage } from './localStoragePersistentStorage';

const PersistentStorageContext = React.createContext<ITasksPersistentStorage | undefined>(undefined);

export const PersistentStorageProvider = PersistentStorageContext.Provider;

export const usePersistentStorage = () => {
  const persistentStorage = useContext(PersistentStorageContext);

  if (!persistentStorage) {
    throw new Error('usePersistentStorage must be used inside of a PersistentStorageContext');
  }

  return persistentStorage;
};
