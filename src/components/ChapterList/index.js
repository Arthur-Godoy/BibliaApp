import React, {useState, useEffect} from 'react';
import {FlatList, Text, View, TouchableHighlight} from 'react-native';
import {Chapter, ChapterBox, ChapterNum, Empty} from './styles';
import {Pressable} from '@react-native-material/core';

const ChapterList = props => {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    console.log('fire');
    let temparr = [];
    let addEmpty = 0;

    props.chapterLength % 4 === 0
      ? (addEmpty = props.chapterLength)
      : (addEmpty = props.chapterLength + (4 - (props.chapterLength % 4)));

    for (let i = 0; i < addEmpty; i++) {
      let txt = i + 1;
      i >= props.chapterLength
        ? temparr.push({id: i, text: ''})
        : temparr.push({id: i, text: txt.toString()});
    }
    setArr(temparr);
  }, []);

  return (
    <FlatList
      data={arr}
      keyExtractor={item => item.id}
      numColumns={4}
      renderItem={({item}) => {
        console.log(item);
        if (item.text === '') {
          return (
            <Empty>
              <Text></Text>
            </Empty>
          );
        } else {
          return (
            <ChapterBox>
              <TouchableHighlight>
                <Chapter>
                  <ChapterNum>{item.text}</ChapterNum>
                </Chapter>
              </TouchableHighlight>
            </ChapterBox>
          );
        }
      }}
    />
  );
};
export default ChapterList;
