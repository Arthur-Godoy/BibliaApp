import styled from 'styled-components/native';
import { View } from 'react-native';

export const ThemeContainer = styled.View`
  flex-direction: row;
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