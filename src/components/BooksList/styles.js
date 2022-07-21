import styled from 'styled-components/native';
import { View, Text } from 'react-native';

export const Book = styled.View`
  border-bottom: 1px solid gray;
  align-items: center;
  flex-grow: 1;
  margin: 5px;
  padding: 20px;
  flex-direction: row;
`;

export const Name = styled.Text`
  font-size: 18px;
  color: white;
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
