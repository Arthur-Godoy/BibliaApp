import styled from 'styled-components/native';

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