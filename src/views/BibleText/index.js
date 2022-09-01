import {Button, Divider} from '@react-native-material/core';
import React, {useState, useEffect, useRef} from 'react';
import aa from '../../data/aa.json';
import {VersicleContainer, TopBarContainer, MiddleButtons} from './styles';
import {Container, Versicle} from '../../../globalStyles';
import {useIsFocused} from '@react-navigation/native';
import {Image, ScrollView, Animated, DrawerLayoutAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Configs from '../Configs';

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

const BibleText = ({route}) => {
  const drawer = useRef(null);
  const [drawerKey, setDrawerKey] = useState(true);
  const navigation = useNavigation();
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
  const [font, setFont] = useState('');
  const {changeFont, changeTheme, theme} = route.params;
  const [btnTheme, setBtnTheme] = useState(theme);

  const changeButton = data => {
    setBtnTheme(data);
  };

  const setVariables = () => {
    setLayoutYArr([]);
    setVersicle('');
    getData('book').then(res => {
      res === null ? setBook('gn') : setBook(res);
    });
    getData('chapter').then(res => {
      res === null ? setChapter('1') : setChapter(res);
    });
    getData('versicle').then(res => {
      res === null ? setVersicle('1') : setVersicle(res);
    });
    getData('font').then(res => {
      setFont(res);
    });
    getData('theme').then(res => {
      res === null ? setBtnTheme('dark') : setBtnTheme(res);
    });
  };

  useEffect(() => {
    if (direction === 'up' || offsetY < 2) {
      Animated.timing(searchBarAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else if (direction === 'down') {
      Animated.timing(searchBarAnim, {
        toValue: -55,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [offsetY]);

  useEffect(() => {
    setVariables();
    if (book !== '') {
      for (let item of aa) {
        if (book === item.abbrev) {
          setTextArr(item.chapters[chapter - 1]);
          setChapterList(item.chapters);
          break;
        }
      }
    }
    drawerKey ? setDrawerKey(!drawerKey) : setDrawerKey(!drawerKey);
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

  return (
    <DrawerLayoutAndroid
      key={drawerKey}
      ref={drawer}
      drawerWidth={300}
      renderNavigationView={() => (
        <Configs
          font={font}
          theme={btnTheme}
          changeFont={changeFont}
          changeTheme={changeTheme}
          changeButton={changeButton}
        />
      )}>
      <Container>
        <Animated.View style={{transform: [{translateY: searchBarAnim}]}}>
          <TopBarContainer>
            {btnTheme === 'dark' ? (
              <Button
                onPressOut={() => {
                  drawer.current.openDrawer();
                }}
                color="black"
                variant="text"
                title={<Image source={require('../../assets/menu.png')} />}
              />
            ) : (
              <Button
                onPressOut={() => {
                  drawer.current.openDrawer();
                }}
                color="black"
                variant="text"
                title={<Image source={require('../../assets/menuLight.png')} />}
              />
            )}
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
            onScroll={e => {
              let x = 0;
              let dif = offsetY - e.nativeEvent.contentOffset.y;
              dif = dif * Math.sign(dif);
              dif > 40 &&
                (setOffsetY(e.nativeEvent.contentOffset.y),
                (x = e.nativeEvent.contentOffset.y > offsetY ? 'down' : 'up'),
                setDirection(x),
                setOffsetY(e.nativeEvent.contentOffset.y));
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
      </Container>
    </DrawerLayoutAndroid>
  );
};

export default BibleText;
