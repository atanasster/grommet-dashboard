import React from 'react';
import PropTypes from 'prop-types';
import RoutedAnchor from '../RoutedAnchor';

const PackageAnchor = ({ packageName, version, children }) => (
  <RoutedAnchor
    route='package'
    params={{
        name: packageName,
        version,
      }}
  >
    {children}
  </RoutedAnchor>
);

PackageAnchor.propTypes = {
  packageName: PropTypes.string.isRequired,
};
export default PackageAnchor;
