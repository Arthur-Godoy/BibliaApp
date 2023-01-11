import React, {useState, useRef, useEffect} from 'react';
import {AbbrevIcon, Book, Name, Container, NewTestment} from './styles';
import aa from '../../data/aa.json';
import {FlatList, Text, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Pressable} from '@react-native-material/core';

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

const BookList = () => {
  const navigation = useNavigation();
  const [layoutYArr, setLayoutYArr] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [ref, setRef] = useState(null);

  const getSelectedBook = () => {
    getData('book').then(res => {
      res === null ? setSelectedBook('gn') : setSelectedBook(res);
    });
  };

  useEffect(() => {
    getSelectedBook();
  });

  const changeAbbrev = abbrev => {
    abbrev = abbrev.split('');
    isNaN(abbrev[0])
      ? (abbrev[0] = abbrev[0].toLocaleUpperCase())
      : (abbrev[1] = abbrev[1].toLocaleUpperCase());
    return abbrev;
  };

  const changeTestment = item => {
    let index = 39; //index of mathews
    if (aa.indexOf(item) >= index) {
      item.testment = true;
    } else {
      item.testment = false;
    }
  };

  const scrollToBook = num => {
    if (selectedBook === aa[num].abbrev) {
      ref.scrollTo({
        x: 0,
        y: layoutYArr[num],
        animated: true,
      });
    }
  };

  return (
    <Container>
      <ScrollView
        ref={ref => {
          setRef(ref);
        }}>
        {aa.map(item => {
          let abbrev = changeAbbrev(item.abbrev);
          changeTestment(item);
          return item.testment ? (
            <Pressable
              onLayout={event => {
                const layout = event.nativeEvent.layout;
                layoutYArr[aa.indexOf(item)] = layout.y;
                setLayoutYArr(layoutYArr);
                if (item.abbrev == selectedBook) {
                  scrollToBook(aa.indexOf(item));
                }
              }}
              onPress={() => {
                navigation.navigate('Capitulo', {
                  abbrev: item.abbrev,
                  chapters: item.chapters,
                });
              }}>
              <NewTestment>
                <Book>
                  <AbbrevIcon>
                    <Text>{abbrev}</Text>
                  </AbbrevIcon>
                  <Name>{item.name}</Name>
                </Book>
              </NewTestment>
            </Pressable>
          ) : (
            <Pressable
              onLayout={event => {
                const layout = event.nativeEvent.layout;
                layoutYArr[aa.indexOf(item)] = layout.y;
                setLayoutYArr(layoutYArr);
                if (item.abbrev == selectedBook) {
                  scrollToBook(aa.indexOf(item));
                }
              }}
              onPress={() => {
                navigation.navigate('Capitulo', {
                  abbrev: item.abbrev,
                  chapters: item.chapters,
                });
              }}>
              <Book>
                <AbbrevIcon>
                  <Text>{abbrev}</Text>
                </AbbrevIcon>
                <Name>{item.name}</Name>
              </Book>
            </Pressable>
          );
        })}
      </ScrollView>
    </Container>
  );
};

export default BookList;
