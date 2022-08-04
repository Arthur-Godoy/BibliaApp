import React from 'react';
import {Node} from 'react';
import {ThemeProvider} from 'styled-components';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BookList from './src/views/BooksList/index';
import ChapterList from './src/views/ChapterList/index';
import VersicleList from './src/views/VersicleList/index';
import BibleText from './src/views/BibleText/index';

const theme = {
  bg: '#191a24',
};
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: '#191a24'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: {color: '#ffff'}
          }}>
          <Stack.Screen name="Livro" component={BookList} />
          <Stack.Screen name="Capitulo" component={ChapterList} />
          <Stack.Screen name="Versiculo" component={VersicleList} />
          <Stack.Screen name="Leitura" component={BibleText} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
