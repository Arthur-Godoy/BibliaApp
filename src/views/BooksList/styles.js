import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import { Pressable } from '@react-native-material/core';

export const Container = styled.View`
  background-color: ${props => props.theme.bg};
`;

export const NewTestment = styled.View`
  background-color: rgba(96, 96, 96, 0.1);
`;

export const Book = styled.View`
  align-items: center;
  flex-grow: 1;
  margin: 5px;
  padding: 20px;
  flex-direction: row;
`;

export const Name = styled.Text`
  font-size: ${props => props.theme.font};
  color: ${props => props.theme.colorFont};
`;

export const AbbrevIcon = styled.View`
  align-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid gray;
  border-radius: 20px;
  background-color: gray;
  color: white;
  margin-right: 40px;
  padding-top: 7px;
`;
