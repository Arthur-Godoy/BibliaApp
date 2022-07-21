import styled from 'styled-components/native';
import { View, Text } from 'react-native';

export const Container = styled.View`
  height: 100%;
  background-color: ${props => props.theme.bg};

`;

export const Title = styled.Text`
  font-size: 24px;
  color: white;
  align-self: center;
  margin: 10px 0px;
`;

