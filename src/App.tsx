import React from 'react';
import { Tasks } from './tasks';
import { Container, CssBaseline } from '@mui/material';
import { PersistentStorageProvider } from './tasks/dataStores/persistentStorageContext';
import { LocalStoragePersistentStorage } from './tasks/dataStores/localStoragePersistentStorage';

const localStoragePersistentStorage = new LocalStoragePersistentStorage();

export const App = () => (
  <Container maxWidth="lg" sx={{ marginTop: '16px' }}>
    <CssBaseline />
    <PersistentStorageProvider value={localStoragePersistentStorage}>
      <Tasks />
    </PersistentStorageProvider>
  </Container>
);
