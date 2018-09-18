import styled from 'styled-components';
import { Box } from 'grommet';

export const StyledCardContent = styled(Box)`
  position: relative;
`;

export const StyledCard = styled(Box)`
  position: relative;
  @media (max-width: ${props => props.theme.global.breakpoints.narrow}px) {
    flex-basis: 100%;
  }
`;


const showCardProps = show => `${show ? 0 : '-180deg'}`;

export const StyledFlipCard = styled(Box)`
  overflow: auto;
  max-height: 100%;
  width: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  -webkit-transition: -webkit-transform ${props => props.flipDuration}s;
  transition: transform ${props => props.flipDuration}s;
  ${props => `-webkit-transform: rotateY(${showCardProps(props.show)});`}
`;
