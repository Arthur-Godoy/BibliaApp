import 'react-native-gesture-handler';
import React from 'react';
import {useState, useEffect} from 'react';
import {ThemeProvider} from 'styled-components';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookList from './src/views/BooksList/index';
import ChapterList from './src/views/ChapterList/index';
import VersicleList from './src/views/VersicleList/index';
import BibleText from './src/views/BibleText/index';
import Configs from './src/views/Configs';

const App = () => {
  const [theme, setTheme] = useState({});
  const [font, setFont] = useState('18');
  const [usrtheme, setUsrTheme] = useState('');
  const Stack = createNativeStackNavigator();

  const getData = key => {
    try {
      const value = AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      alert('Erro ao guardar os dados', e);
    }
  };

  const storeData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (e) {
      alert('erro ao setar dados');
    }
  };

  useEffect(() => {
    getData('font').then(res => {
      if (res === null) {
        setFont('18');
      } else {
        setFont(res);
      }
    });
    getData('theme').then(res => {
      if (res === null) {
        setUsrTheme('dark');
      } else {
        setUsrTheme(res);
      }
    });
    if (usrtheme === 'dark') {
      setTheme({font: font + 'px', bg: '#191a24', colorFont: '#EFFFFD'});
    } else {
      setTheme({font: font + 'px', bg: '#EFFFFD', colorFont: '#191a24'});
    }
  }, [font, usrtheme]);

  const changeFont = data => {
    storeData('font', String(data));
    setFont(data);
  };

  const changeTheme = data => {
    storeData('theme', String(data));
    setUsrTheme(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: '#191a24'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: {color: '#ffff'},
          }}>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            initialParams={{changeFont, changeTheme, usrtheme}}
            name="Leitura"
            component={BibleText}
          />
          <Stack.Screen name="Livro" component={BookList} />
          <Stack.Screen name="Capitulo" component={ChapterList} />
          <Stack.Screen name="Versiculo" component={VersicleList} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
