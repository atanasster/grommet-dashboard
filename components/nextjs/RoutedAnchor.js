import PropTypes from 'prop-types';

import { withRouter } from 'next/router';
import { Anchor, Text } from 'grommet';
import { Link } from '../../server/routes';
import { queryParams } from './urlParams';

class RoutedAnchor extends React.Component {
  render() {
    const {
      path, preserveParams, route, children, router, params, size, label, ...rest
    } = this.props;
    const query = queryParams(router, preserveParams);
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link
        route={route}
        params={{ ...query, ...params }}
        href={{ pathname: path, query }}
        passHref={true}
      >
        <Anchor {...rest} label={label && <Text size={size}>{label}</Text>} >
          {children}
        </Anchor>
      </Link>
    );
  }
}

RoutedAnchor.defaultProps = {
  preserveParams: undefined,
  path: undefined,
  route: undefined,
};

RoutedAnchor.propTypes = {
  path: PropTypes.string,
  route: PropTypes.string,
  preserveParams: PropTypes.oneOfType([
    PropTypes.string, PropTypes.array,
  ]),
};
export default withRouter(RoutedAnchor);
