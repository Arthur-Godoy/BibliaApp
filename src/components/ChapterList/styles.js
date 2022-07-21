import styled from 'styled-components/native';
import {ScrollView, Text} from 'react-native';
import { Button, Pressable } from '@react-native-material/core';

export const ChapterBox = styled.ScrollView`
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