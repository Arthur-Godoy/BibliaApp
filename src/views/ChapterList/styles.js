import styled from 'styled-components/native';
import {View, Text} from 'react-native';
import { Button, Pressable } from '@react-native-material/core';

export const Container = styled.View`
  background-color: ${props => props.theme.bg};
  height: 100%;
`;

export const ChapterBox = styled.View`
  flex: 1;
  width: 1px;
`;

export const Chapter = styled.View`
  height: 80px;
  align-items: center;
  padding: 10px;
  text-decoration: underline;
`;

export const ChapterNum = styled.Text`
  font-size: 18px;
`;

export const Empty = styled.View`
  width: 25%;
`;