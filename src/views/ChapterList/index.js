import React, {useState, useEffect} from 'react';
import {FlatList, Text, TouchableHighlight} from 'react-native';
import {Chapter, ChapterBox, ChapterNum, Container, Empty} from './styles';
import {useNavigation} from '@react-navigation/native';

const ChapterList = ({route}) => {
  const navigation = useNavigation();
  const {chapters} = route.params;
  const [arr, setArr] = useState([]);

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
              <ChapterBox>
                <TouchableHighlight
                  onPress={() => {
                    navigation.navigate('Versiculo', {
                      versicles: chapters[item.text - 1],
                    });
                  }}>
                  <Chapter>
                    <ChapterNum>{item.text}</ChapterNum>
                  </Chapter>
                </TouchableHighlight>
              </ChapterBox>
            );
          }
        }}
      />
    </Container>
  );
};
export default ChapterList;
