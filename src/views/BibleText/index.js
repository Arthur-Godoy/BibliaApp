import {AppBar, Button} from '@react-native-material/core';
import React, {useState, useEffect, useRef} from 'react';
import aa from '../../data/aa.json';
import {
  Versicle,
  Container,
  VersicleContainer,
  TopBarContainer,
  MiddleButtons,
} from './styles';
import {useIsFocused} from '@react-navigation/native';
import {Text, Image, DrawerLayoutAndroid, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {ScrollTo, Target, ScrollView, useScrollTo} from '@nandorojo/anchor';

const getData = key => {
  try {
    const value = AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    alert(e);
    switch (key) {
      case 'book':
        return 'gn';
        break;
      case 'chapter':
        return '1';
        break;
      case 'versicle':
        return '1';
        break;
    }
  }
};

const BibleText = () => {
  const {scrollTo} = useScrollTo();
  const navigation = useNavigation();
  const drawer = useRef(null);
  const [textArr, setTextArr] = useState([]);
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [chaptersArr, setChaptersArr] = useState([]);
  const [versicle, setVersicle] = useState('');
  const [num, setNum] = useState(0);
  const focused = useIsFocused();

  const onPress = () => {
    console.log(versicle);
    scrollTo(versicle);
  };

  useEffect(() => {
    setNum(num + 1);
    console.log('fire');
    getData('book').then(res => {
      setBook(res);
    });
    getData('chapter').then(res => {
      setChapter(res);
    });
    getData('versicle').then(res => {
      setVersicle(res);
    });
    scrollTo(versicle);
    for (let item of aa) {
      if (book === item.abbrev) {
        setChaptersArr(item.chapters);
        setTextArr(item.chapters[chapter - 1]);
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused, chapter]);

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={() => (
        <Container>
          <Text>OPA</Text>
        </Container>
      )}>
      <TopBarContainer>
        <Button
          onPress={() => drawer.current.openDrawer()}
          color="white"
          variant="text"
          title={<Image source={require('../../assets/menu.png')} />}
        />
        <MiddleButtons>
          <Button
            onPress={() => {
              navigation.navigate('Livro');
            }}
            style={{marginRight: 5}}
            color="white"
            variant="outlined"
            title={book}
          />
          <Button
            onPress={() => {
              navigation.navigate('Capitulo');
            }}
            color="white"
            variant="outlined"
            title={chapter}
          />
        </MiddleButtons>
      </TopBarContainer>
      <ScrollView>
        <Container>
          {textArr.map(txt => {
            let num = textArr.indexOf(txt) + 1;
            return (
              <VersicleContainer
                key={num}
                style={num === textArr.length && {marginBottom: 250}}>
                <Target name={num}>
                  <Versicle>{'   ' + num + '  ' + txt}</Versicle>
                </Target>
              </VersicleContainer>
            );
          })}
        </Container>
      </ScrollView>
    </DrawerLayoutAndroid>
  );
};

export default BibleText;
