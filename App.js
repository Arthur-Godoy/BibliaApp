import React from 'react';
import {Node} from 'react';
import {Text, View} from 'react-native';
import BookNavegation from './src/views/BookNavegation/index.js';
import { ThemeProvider } from 'styled-components';

const theme = {
  bg: '#191a24'
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BookNavegation/>
    </ThemeProvider>
  );
};

export default App;
