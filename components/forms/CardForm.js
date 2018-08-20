import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';
import { Form } from 'grommet-controls';
import { Card, CardTitle, CardActions, CardContent } from '../Card';

const CardForm = ({
  basis, title, children, footer, actions, submitLabel, onSubmit, object,
}) => (
  <Box basis={basis} gap='large'>
    <Card>
      <CardTitle pad='medium'>
        {title}
      </CardTitle>
      <Form onSubmit={f => (onSubmit ? onSubmit(f) : alert(JSON.stringify(f)))} basis='full' object={object}>
        <CardContent gap='small' pad={{ horizontal: 'medium', top: 'medium', bottom: 'large' }} >
          {children}
        </CardContent>
        <CardActions pad='medium' alignContent='stretch'>
          {actions || <Button hoverIndicator='background' primary={true} type='submit' label={submitLabel} />}
        </CardActions>
      </Form>
    </Card>
    <Box direction='row' alignSelf='center' gap='small' align='center'>
      {footer}
    </Box>
  </Box>
);

CardForm.defaultProps = {
  basis: 'medium',
  footer: undefined,
  actions: undefined,
  submitLabel: 'Submit',
  onSubmit: undefined,
  object: undefined,
};

CardForm.propTypes = {
  basis: PropTypes.string,
  title: PropTypes.string.isRequired,
  footer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  actions: PropTypes.element,
  submitLabel: PropTypes.string,
  onSubmit: PropTypes.func,
  object: PropTypes.object,
};

export default CardForm;
