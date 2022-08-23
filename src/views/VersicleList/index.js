import React, {useState, useEffect} from 'react';
import {FlatList, Text, View, TouchableHighlight} from 'react-native';
import {Versicle, Box, VersicleNum, Empty, Container} from './styles';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'

const VersicleList = ({route}) => {
  const navigation = useNavigation();
  const {versicles} = route.params;
  const [arr, setArr] = useState([]);
  const storeData = async data => {
    try {
      await AsyncStorage.setItem('versicle', data);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    let temparr = [];
    let addEmpty = 0;

    versicles % 4 === 0
      ? (addEmpty = versicles)
      : (addEmpty = versicles + (4 - (versicles % 4)));

    for (let i = 0; i < addEmpty; i++) {
      let txt = i + 1;
      i >= versicles
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
              <Box>
                <TouchableHighlight
                  onPress={() => {
                    navigation.navigate('Leitura', {
                      versicleSelected: item.text,
                    });
                    storeData(item.text);
                  }}>
                  <Versicle>
                    <VersicleNum>{item.text}</VersicleNum>
                  </Versicle>
                </TouchableHighlight>
              </Box>
            );
          }
        }}
      />
    </Container>
  );
};
export default VersicleList;
