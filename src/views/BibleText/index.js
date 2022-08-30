import {Button, Divider, Switch} from '@react-native-material/core';
import React, {useState, useEffect, useRef} from 'react';
import aa from '../../data/aa.json';
import {
  VersicleContainer,
  TopBarContainer,
  MiddleButtons,
  ListButton,
  MenuTitle,
} from './styles';
import {Container, Versicle} from '../../../globalStyles';
import {useIsFocused} from '@react-navigation/native';
import {
  Image,
  DrawerLayoutAndroid,
  ScrollView,
  Animated,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {Txt} from './../../../globalStyles';

const getData = key => {
  try {
    const value = AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    alert(e);
  }
};

const storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (e) {
    alert('erro ao setar dados');
  }
};

const BibleText = ({route}) => {
  const navigation = useNavigation();
  const drawer = useRef();
  //get text on data, and show
  const [textArr, setTextArr] = useState([]);
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [versicle, setVersicle] = useState('');
  const [chapterList, setChapterList] = useState([]);
  //go to selected versicle
  const [layoutYArr, setLayoutYArr] = useState([]);
  const [ref, setRef] = useState(null);
  //refresh on screen focused
  const focused = useIsFocused();
  //hide top bar on scroll
  const [offsetY, setOffsetY] = useState('');
  const [direction, setDirection] = useState('up');
  const searchBarAnim = useRef(new Animated.Value(-55)).current;
  //custom styles
  const {changeFont, changeTheme} = route.params;
  const [font, setFont] = useState('');
  const [theme, setTheme] = useState('ligth');
  const [checkedTheme, setCheckedTheme] = useState(true);

  useEffect(() => {
    if (direction === 'up' || offsetY < 2) {
      Animated.timing(searchBarAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else if (direction === 'down' && offsetY > 10) {
      Animated.timing(searchBarAnim, {
        toValue: -55,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [offsetY]);

  useEffect(() => {
    setLayoutYArr([]);
    setVersicle('');
    getData('book').then(res => {
      if (res === null) {
        setBook('gn');
      } else {
        setBook(res);
      }
    });
    getData('chapter').then(res => {
      if (res === null) {
        setChapter('1');
      } else {
        setChapter(res);
      }
    });
    getData('versicle').then(res => {
      if (res === null) {
        setVersicle('1');
      } else {
        setVersicle(res);
      }
    });
    getData('font').then(res => {
      if (res === null) {
        setFont('18');
      } else {
        setFont(res);
      }
    });
    getData('theme').then(res => {
      if (res === 'dark') {
        setCheckedTheme(true);
      } else {
        setCheckedTheme(false);
      }
    });
    if (book !== '') {
      for (let item of aa) {
        if (book === item.abbrev) {
          setTextArr(item.chapters[chapter - 1]);
          setChapterList(item.chapters);
          break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused, chapter]);

  const scrollToVersicle = () => {
    if (versicle == layoutYArr.length - 2) {
      setOffsetY(layoutYArr[versicle]);
      ref.scrollTo({
        x: 0,
        y: layoutYArr[versicle],
        animated: true,
      });
    }
  };

  const applyTheme = () => {
    setCheckedTheme(!checkedTheme);
    checkedTheme
      ? (setTheme('dark'), storeData('theme', theme))
      : (setTheme('ligth'), storeData('theme', theme));
    changeTheme(theme);
  };

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      renderNavigationView={() => (
        <Container>
          <MenuTitle>Configurações:</MenuTitle>
          <ListButton onPress={() => applyTheme()}>
            <Txt>Tema Escuro:</Txt>
            <Switch value={checkedTheme} onValueChange={() => applyTheme()} />
          </ListButton>
          <MenuTitle>Tamanho da Fonte</MenuTitle>
          <Txt style={{marginLeft: 120, marginBottom: -20}}>{font}</Txt>
          <View style={{marginLeft: 30}}>
            <MultiSlider
              onValuesChange={e => {
                setFont(e);
                storeData('font', String(e));
                changeFont(e);
              }}
              sliderLength={200}
              step={1}
              min={10}
              max={30}
            />
          </View>
        </Container>
      )}>
      <Animated.View style={{transform: [{translateY: searchBarAnim}]}}>
        <TopBarContainer>
          <Button
            onPressOut={() => {
              drawer.current.openDrawer();
            }}
            color="black"
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
              variant="contained"
              title={book}
            />
            <Button
              onPress={() => {
                navigation.navigate('Capitulo', {
                  abbrev: book,
                  chapters: chapterList,
                });
              }}
              color="white"
              variant="contained"
              title={chapter}
            />
          </MiddleButtons>
        </TopBarContainer>
        <Divider />
      </Animated.View>
      <Animated.View style={{transform: [{translateY: searchBarAnim}]}}>
        <ScrollView
          ref={ref => {
            setRef(ref);
          }}
          onScrollEndDrag={e => {
            let x = e.nativeEvent.contentOffset.y > offsetY ? 'down' : 'up';
            setDirection(x);
            setOffsetY(e.nativeEvent.contentOffset.y);
          }}
          onScroll={e => {
            let dif = offsetY - e.nativeEvent.contentOffset.y;
            dif = dif * Math.sign(dif);
            dif > 30 && setOffsetY(e.nativeEvent.contentOffset.y);
          }}>
          <Container>
            {textArr.map(txt => {
              let num = textArr.indexOf(txt) + 1;
              return (
                <VersicleContainer
                  key={num}
                  style={num === textArr.length && {marginBottom: 250}}
                  onLayout={event => {
                    const layout = event.nativeEvent.layout;
                    layoutYArr[num] = layout.y;
                    setLayoutYArr(layoutYArr);
                    scrollToVersicle();
                  }}>
                  <Versicle>{'   ' + num + '  ' + txt}</Versicle>
                </VersicleContainer>
              );
            })}
          </Container>
        </ScrollView>
      </Animated.View>
    </DrawerLayoutAndroid>
  );
};

export default BibleText;
