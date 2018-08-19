import React, { Component } from 'react';
import { compose } from 'recompose';
import { Stack, Box, Heading } from 'grommet';
import { withTheme } from 'grommet/components/hocs';
import doc from './doc';
import { StyledCard, StyledCardContent, StyledFlipCard } from './StyledCard';

export const CardActions = ({ children, pad = 'small', ...rest }) => (
  <Box justifySelf='end' align='center' pad={pad} gap='small' border='top' flex={false} fill='horizontal' direction='row' {...rest}>
    {children}
  </Box>
);

export const CardTitle = ({
  children, color, textAlign, truncate, level = 4, pad = 'small', strong = false, responsive, ...rest
}) => (
  <Box responsive={responsive} direction='row' fill={true} pad={pad} border='bottom' gap='small' flex={false} {...rest} >
    {typeof children !== 'string' ? children : (
      <Heading
        level={level}
        margin='none'
        color={color}
        textAlign={textAlign}
        truncate={truncate}
        responsive={responsive}
      >
        {strong ? <strong>{children}</strong> : children}
      </Heading>
    )}
  </Box>
);

export const CardContent = ({ children, pad = 'small', ...rest }) => (
  <Box overflow='scroll' justifySelf='stretch' pad={pad} fill='horizontal' {...rest} >
    {children}
  </Box>
);

class Card extends Component {
  static defaultProps = {
    title: undefined,
    align: 'center',
    border: 'all',
    elevation: 'small',
    round: 'xsmall',
    flex: false,
    gap: 'small',
    titleLevel: 2,
    backContent: undefined,
    flipped: false,
    flipOnHover: true,
    background: 'white',
    flipDuration: 0.3,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { flipped: !!props.flipped };
  }
  componentWillReceiveProps({ flipped: nextFlipped }) {
    const { flipped } = this.state;
    if (nextFlipped !== undefined && nextFlipped !== flipped) {
      this.toggleInnerContent(nextFlipped);
    }
  }
  toggleInnerContent = (showInnner) => {
    const { backContent, onFlip } = this.props;
    if (backContent) {
      const { flipped } = this.state;
      if (flipped !== showInnner) {
        this.setState({ flipped: showInnner }, () => {
          if (onFlip) {
            // timeout to allow event to propagate
            setTimeout(() => {
              onFlip(showInnner);
            }, 0);
          }
        });
      }
    }
  };
  onHover = (hover) => {
    this.toggleInnerContent(hover);
  };
  render() {
    const {
      align, gap, children, flipCard,
      theme, backContent, flipDuration, flipOnHover,
      ...rest
    } = this.props;
    const { flipped } = this.state;
    return (
      <StyledCard
        theme={theme}
        overflow='hidden'
        justify='stretch'
        {...rest}
      >
        <StyledCardContent
          fill='horizontal'
          flex={true}
          onFocus={() => {}}
          onMouseOver={flipOnHover ? () => this.onHover(true) : undefined}
          onMouseLeave={flipOnHover ? () => this.onHover(false) : undefined}
        >
          <Stack>
            <StyledFlipCard
              align={align}
              gap={gap}
              show={!flipped}
              flipDuration={flipDuration}
            >
              {children}
            </StyledFlipCard>
            {backContent && (
              <StyledFlipCard
                style={{ overflow: 'scroll' }}
                show={flipped}
                flipDuration={flipDuration}
              >
                {backContent}
              </StyledFlipCard>
            )}
          </Stack>
        </StyledCardContent>
      </StyledCard>
    );
  }
}


if (process.env.NODE_ENV !== 'production') {
  doc(Card);
}

export default compose(
  withTheme,
)(Card);
