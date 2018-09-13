import React from 'react';
import PropTypes from 'prop-types';
import { Box, Layer, Heading, Paragraph, Button } from 'grommet';

const positionToFull = (position) => {
  switch (position) {
    case 'left':
    case 'right':
      return 'vertical';
    case 'top':
    case 'bottom':
      return 'horizontal';
    default:
      return false;
  }
};

const Modal = ({
  title, content, position, onClose, ...rest
}) => (
  <Layer
    position={position}
    full={positionToFull(position)}
    onEsc={onClose}
    onClickOutside={onClose}
    responsive={false}
    {...rest}
  >
    <Box pad={{ horizontal: 'medium' }}>
      <Heading level={2} margin='medium'>{title}</Heading>
      <Paragraph>
        {content}
      </Paragraph>
      <Box align='start' margin={{ vertical: 'medium' }}>
        <Button primary={true} label='Close' onClick={onClose} />
      </Box>
    </Box>
  </Layer>
);

Modal.defaultProps = {
  content: undefined,
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'center']).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
