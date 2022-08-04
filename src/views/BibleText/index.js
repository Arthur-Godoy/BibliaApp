import React, {useEffect, useState} from 'react';
import {StyleSheet, Versicle, Container, VersicleContainer} from './styles';

const BibleText = ({route}) => {
  const {textArr, selected} = route.params;

  return (
    <Container>
      {textArr.map(txt => {
        let num = textArr.indexOf(txt) + 1;
        return (
          <VersicleContainer
            style={num === textArr.length && {marginBottom: 250}}>
            <Versicle>{num + '  ' + txt}</Versicle>
          </VersicleContainer>
        );
      })}
    </Container>
  );
};


export default BibleText;
