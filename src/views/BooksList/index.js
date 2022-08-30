import React from 'react';
import {AbbrevIcon, Book, Name, Container} from './styles';
import aa from '../../data/aa.json';
import {FlatList, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Pressable} from '@react-native-material/core';

const BookList = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <FlatList
        data={aa}
        keyExtractor={item => item.abbrev}
        numColumns={1}
        renderItem={({item}) => {
          let abbrev = item.abbrev.split('');
          isNaN(abbrev[0])
            ? (abbrev[0] = abbrev[0].toLocaleUpperCase())
            : (abbrev[1] = abbrev[1].toLocaleUpperCase());
          return (
            <Pressable
              onPress={() => {
                navigation.navigate('Capitulo', {
                  abbrev: item.abbrev,
                  chapters: item.chapters
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
        }}
      />
    </Container>
  );
};

export default BookList;
