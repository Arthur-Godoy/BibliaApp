import React, {useState, useEffect, useRef} from 'react';
import { Pressable } from '@react-native-material/core';
import {MenuTitle, ThemeContainer} from './styles';
import {Container} from './../../../globalStyles';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {Txt} from './../../../globalStyles';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async key => {
  try {
    let value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return value;
    }
  } catch (e) {
    alert(e);
  }
};

const Configs = props => {
  const [font, setFont] = useState('');

  useEffect(() =>{
    getData('font').then(res => {
      res === null ? setFont('18') : setFont(res);
    });
  },[])
  
  return (
    <Container>
      <MenuTitle>Configurações:</MenuTitle>
      <MenuTitle>Tema:</MenuTitle>
      <ThemeContainer>
        <Pressable
          style={styles.dark}
          onPressOut={() => {
            props.changeTheme('dark');
            props.changeButton('dark');
          }}
        />
        <Pressable
          style={styles.light}
          onPressOut={() => {
            props.changeTheme('light');
            props.changeButton('light');
          }}
        />
      </ThemeContainer>
      <MenuTitle>Tamanho da Fonte</MenuTitle>
      <Txt style={{marginLeft: 120, marginBottom: -20}}>{font}</Txt>
      <View style={{marginLeft: 30}}>
        <MultiSlider
          onValuesChange={e => {
            props.changeFont(String(e));
            setFont(String(e));
          }}
          sliderLength={200}
          step={1}
          min={10}
          max={30}
        />
      </View>
    </Container>
  );
};

const styles = {
  dark:{
    borderRadius: 50,
    backgroundColor: '#191a24',
    width: 20,
    height: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'gray',
    marginLeft: 20,
  },
  light:{
    borderRadius: 50,
    backgroundColor: '#EFFFFD',
    width: 20,
    height: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'gray',
    marginLeft: 20,
  }
};

export default Configs;
