import React from 'react';
import StyledIconButton from './StyledIconButton';

class IconButton extends React.Component {
  render() {
    return (
      <StyledIconButton
        {...this.props}

        hoverIndicator={{
          dark: {
            color: 'dark-2',
            opacity: 'none',
          },
          light: {
            color: 'light-2',
            opacity: 'none',
          },
          border: {
            radius: '50%',
          },
        }}
      />
    );
  }
}

export default IconButton;
