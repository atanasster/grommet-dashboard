import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Button, ResponsiveContext } from 'grommet';
import { FormClose, FormCheckmark } from 'grommet-icons';
import { Card } from 'grommet-controls';
import SiteLayout from '../components/layouts/SiteLayout';
import Title from '../components/layouts/Title';

const statusIcon = {
  true: <FormCheckmark color='status-ok' />,
  false: <FormClose color='status-error' />,
  undefined: null,
};

const PriceCard = ({
  basis,
  verticalBasis,
  title,
  price,
  color,
  items,
  action,
} = {}) => {
  const buttonProps = { ...{ label: 'Choose plan', primary: false }, ...action };
  return (
    <Box pad='small' basis={basis} >
      <Card>
        <Card.CardTitle
          border={{ side: 'top', size: 'large', color }}
          justify='center'
        >
          {title}
        </Card.CardTitle>
        <Card.CardContent fill='horizontal' basis={verticalBasis} align='center' gap='medium'>
          <Heading level={1}>
            {price}
          </Heading>
          <Box align='center' justify='between'>
            {items.map(item => (
              <Box key={`pricing_${typeof title === 'string' ? title : price}_${item.label} `} direction='row'>
                {statusIcon[item.status]}
                {item.label}
              </Box>
            ))}
          </Box>
        </Card.CardContent>
        <Card.CardActions>
          <Box fill='horizontal' pad='medium'>
            <Button {...buttonProps} />
          </Box>
        </Card.CardActions>
      </Card>
    </Box>
  );
};

PriceCard.defaultProps = {
  items: [],
  color: 'light-3',
  basis: '1/4',
  verticalBasis: 'medium',
  action: undefined,
};

PriceCard.propTypes = {
  title: PropTypes.node.isRequired,
  price: PropTypes.node.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    status: PropTypes.oneOf([undefined, true, false]),
  })),
  color: PropTypes.string,
  basis: PropTypes.string,
  verticalBasis: PropTypes.string,
  action: PropTypes.object,
};

const items = level => ([
  { label: 'Data dashboards' },
  { label: 'Real-time chat', status: true },
  { label: 'Investing models', status: ['starter', 'pro', 'enterprise'].indexOf(level) !== -1 },
  { label: 'Real-time prices', status: ['starter', 'pro', 'enterprise'].indexOf(level) !== -1 },
  { label: 'Short-term investing', status: ['pro', 'enterprise'].indexOf(level) !== -1 },
  { label: 'Medium-term investing', status: ['pro', 'enterprise'].indexOf(level) !== -1 },
  { label: 'Long-term investing', status: level === 'enterprise' },
]);
const responsiveBasis = (size) => {
  switch (size) {
    case 'small':
      return 'full';
    case 'medium':
      return '1/2';
    case 'large':
      return '1/4';
    default:
      return 'full';
  }
};
export default () => (
  <SiteLayout title='Subscriptions'>
    <Title label='Subscriptions' />
    <ResponsiveContext.Consumer>
      {size => (
        <Box wrap={true} flex={false} full='horizontal' direction='row'>
          <PriceCard
            basis={responsiveBasis(size)}
            title='Free'
            price='$0.0'
            items={items('free')}
            action={{ onClick: () => alert('Free') }}
          />
          <PriceCard
            basis={responsiveBasis(size)}
            title='Starter'
            price='$9.90'
            items={items('starter')}
            action={{ onClick: () => alert('Starter') }}
          />
          <PriceCard
            basis={responsiveBasis(size)}
            title='Pro'
            price='$99.90'
            items={items('pro')}
            color='status-ok'
            action={{ primary: true, onClick: () => alert('Pro') }}
          />
          <PriceCard
            basis={responsiveBasis(size)}
            title='Enterprise'
            price='$499.90'
            items={items('enterprise')}
            action={{ onClick: () => alert('Enterprise') }}
          />
        </Box>
        )}
    </ResponsiveContext.Consumer>
  </SiteLayout>
);
