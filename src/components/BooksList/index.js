import React from 'react';
import {AbbrevIcon, Book, Name} from '../../components/BooksList/styles';
import aa from '../../data/aa.json';
import {FlatList, Text, TouchableHighlight} from 'react-native';

const BookList = props => {
  return (
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
              props.book(item.chapters)
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
  );
};

export default BookList;
