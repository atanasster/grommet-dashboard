import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { Anchor as GrommetAnchor } from 'grommet';
import urlParams from './urlParams';

class Anchor extends React.Component {
  render() {
    const {
      path, preserveParams, router, label, ...rest
    } = this.props;
    const href = urlParams(path, router, preserveParams);
    return (
      <GrommetAnchor href={href} {...rest} >{label}</GrommetAnchor>
    );
  }
}

Anchor.defaultProps = {
  preserveParams: undefined,
};

Anchor.propTypes = {
  path: PropTypes.string.isRequired,
  preserveParams: PropTypes.oneOfType([
    PropTypes.string, PropTypes.array,
  ]),
};
export default withRouter(Anchor);
