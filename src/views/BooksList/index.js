import React from 'react';
import {AbbrevIcon, Book, Name, Container} from './styles';
import aa from '../../data/aa.json';
import {FlatList, Text, TouchableHighlight} from 'react-native';
import {useNavigation} from '@react-navigation/native';

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
            <TouchableHighlight
              onPress={() => {
                navigation.navigate('Capitulo', {
                  chapters: item.chapters,
                });
              }}>
              <Book>
                <AbbrevIcon>
                  <Text>{abbrev}</Text>
                </AbbrevIcon>
                <Name>{item.name}</Name>
              </Book>
            </TouchableHighlight>
          );
        }}
      />
    </Container>
  );
};

export default BookList;
