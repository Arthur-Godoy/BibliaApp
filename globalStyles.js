import styled from 'styled-components/native';

export const Container = styled.View`
  text-align: center;
  height: 100%;
  background-color: ${props => props.theme.bg};
`;

export const Empty = styled.View`
  width: 25%;
`;

export const ContentBox = styled.View`
  flex: 1;
  width: 1px;
`;

export const Content = styled.View`
  height: 80px;
  align-items: center;
  padding: 10px;
  text-decoration: underline;
`;

export const Num = styled.Text`
  color: ${props => props.theme.colorFont};
  font-size: ${props => props.theme.font};
`;

export const Versicle = styled.Text`
  color: ${props => props.theme.colorFont};
  font-size: ${props => props.theme.font};
`;

export const Txt = styled.Text`
  color: ${props => props.theme.colorFont};
`;
