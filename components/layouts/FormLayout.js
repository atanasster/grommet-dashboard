import React from 'react';
import PropTypes from 'prop-types';
import CenterLayout from './CenterLayout';
import CardForm from '../forms/CardForm';


const FormLayout = ({ title, ...rest }) => (
  <CenterLayout
    title={title}
  >
    <CardForm {...rest} />
  </CenterLayout>
);

FormLayout.defaultProps = {
  basis: 'medium',
  footer: undefined,
  actions: undefined,
  submitLabel: 'Submit',
  onSubmit: undefined,
  object: undefined,
};

FormLayout.propTypes = {
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

export default FormLayout;
