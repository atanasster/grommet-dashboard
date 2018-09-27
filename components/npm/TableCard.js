import React from 'react';
import PropTypes from 'prop-types';
import { PagingTable, Card } from 'grommet-controls';

const TableCard = ({
  data, title, columns, defaultSorted, ...rest
}) => (
  <Card
    background='white'
    {...rest}
  >
    <Card.CardTitle>
      {title}
    </Card.CardTitle>
    <Card.CardContent >
      <PagingTable
        columns={columns}
        data={data}
        decorations={{
          header: { border: 'horizontal', weight: 'bold' },
          pagination: { pad: { vertical: 'xsmall' } },
        }}
        defaultPageSize={9}
        showPageJump={false}
        showPageSizeOptions={false}
        defaultSorted={defaultSorted}
        showPaginationTop={true}
        showPaginationBottom={false}
      />
    </Card.CardContent>
  </Card>
);

TableCard.defaultProps = {
  data: [],
};

TableCard.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  defaultSorted: PropTypes.array.isRequired,
};

export default TableCard;
