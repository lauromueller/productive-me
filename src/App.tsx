import React from 'react';
import { Tasks } from './tasks';
import { Container, CssBaseline } from '@mui/material';

export const App = () => (
  <Container maxWidth="lg" sx={{ marginTop: '16px' }}>
    <CssBaseline />
    <Tasks />
  </Container>
);
