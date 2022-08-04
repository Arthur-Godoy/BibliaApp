import styled from 'styled-components/native';
import {ScrollView, Text} from 'react-native';

export const Container = styled.ScrollView`
  text-align: center;
  height: 100%;
  background-color: ${props => props.theme.bg};
`;

export const VersicleContainer = styled.View`
  flex: 1;
  flex-direction: row;
  margin: 5px 0px;
  width: 95%;
  margin-left: 10px;
`;

export const Versicle = styled.Text`
  font-size: 18px;
`;
