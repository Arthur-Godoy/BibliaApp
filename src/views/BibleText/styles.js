import styled from 'styled-components/native';
import {Button} from '@react-native-material/core';

export const Buttao = styled.Button`
  width: 100px;
  background-color: ${props => props.theme.bg};
  border: 1px solid ${props => props.theme.colorFont};
  color: ${props => props.theme.colorFont};
  border-radius: 10px;
  margin-right: 5px;
`;

export const TopBarContainer = styled.View`
  padding: 10px;
  flex-direction: row;
  background-color: ${props => props.theme.bg};
`;

export const MiddleButtons = styled.View`
  margin-left: 16%;
  flex-direction: row;
`;

export const VersicleContainer = styled.View`
  flex: 1;
  flex-direction: row;
  margin: 5px 0px;
  width: 95%;
  margin-left: 10px;
`;

export const ListButton = styled.Pressable`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 20px 10px 20px;
  background-color: ${props => props.theme.bg};
`;

export const MenuTitle = styled.Text`
  padding: 20px 20px 10px 10px;
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.colorFont}
`;
