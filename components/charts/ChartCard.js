import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../Card';

const ChartCard = ({ title, children }) => (
  <Card>
    <Card.CardTitle>
      {title}
    </Card.CardTitle>
    <Card.CardContent basis='medium'>
      {children}
    </Card.CardContent>
  </Card>
);

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ChartCard;
