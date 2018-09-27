import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'grommet-controls';

const ChartCard = ({ title, children, basis }) => (
  <Card>
    <Card.CardTitle>
      {title}
    </Card.CardTitle>
    <Card.CardContent basis={basis}>
      {children}
    </Card.CardContent>
  </Card>
);

ChartCard.defaultProps = {
  basis: 'medium',
};

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  basis: PropTypes.string,
};

export default ChartCard;
