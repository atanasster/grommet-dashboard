import React from 'react';
import PropTypes from 'prop-types';
import { Anchor } from 'grommet';
import { ImageStamp } from 'grommet-controls';

const GithubUser = ({ user }) => (
  <Anchor target='_blank' href={user.html_url}>
    <ImageStamp size='medium' src={user.avatar_url} />
  </Anchor>
);

GithubUser.propTypes = {
  user: PropTypes.shape({
    html_url: PropTypes.string,
    avatar_url: PropTypes.string,
  }).isRequired,
};
export default GithubUser;
