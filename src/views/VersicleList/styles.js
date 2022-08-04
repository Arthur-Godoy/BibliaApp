import styled from 'styled-components/native';
import {ScrollView, Text} from 'react-native';
import { Button, Pressable } from '@react-native-material/core';

export const Container = styled.View`
  background-color: ${props => props.theme.bg};
  height: 100%;
`;

export const Box = styled.ScrollView`
  flex: 1;
  width: 1px;
`;

export const Versicle = styled.View`
  height: 80px;
  align-items: center;
  padding: 10px;
  text-decoration: underline;
`;

export const VersicleNum = styled.Text`
  font-size: 18px;
`;

export const Empty = styled.View`
  width: 25%;
`;