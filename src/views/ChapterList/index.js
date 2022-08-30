import React, {useState, useEffect} from 'react';
import {FlatList, Text} from 'react-native';
import {
  Content,
  ContentBox,
  Num,
  Container,
  Empty,
} from '../../../globalStyles';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Pressable} from '@react-native-material/core';

const ChapterList = ({route}) => {
  const navigation = useNavigation();
  const {chapters, abbrev} = route.params;
  const [arr, setArr] = useState([]);
  const storeData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (e) {
      alert('erro ao setar dados');
    }
  };

  useEffect(() => {
    let temparr = [];
    let addEmpty = 0;
    chapters.length % 4 === 0
      ? (addEmpty = chapters.length)
      : (addEmpty = chapters.length + (4 - (chapters.length % 4)));

    for (let i = 0; i < addEmpty; i++) {
      let txt = i + 1;
      i >= chapters.length
        ? temparr.push({id: i, text: ''})
        : temparr.push({id: i, text: txt.toString()});
    }
    setArr(temparr);
  }, []);

  return (
    <Container>
      <FlatList
        data={arr}
        keyExtractor={item => item.id}
        numColumns={4}
        renderItem={({item}) => {
          if (item.text === '') {
            return (
              <Empty>
                <Text></Text>
              </Empty>
            );
          } else {
            return (
              <ContentBox>
                <Pressable
                  onPress={() => {
                    navigation.navigate('Versiculo', {
                      versicles: chapters[item.text - 1].length,
                    });
                    storeData('chapter', item.text);
                    storeData('book', abbrev);
                  }}>
                  <Content>
                    <Num>{item.text}</Num>
                  </Content>
                </Pressable>
              </ContentBox>
            );
          }
        }}
      />
    </Container>
  );
};
export default ChapterList;
