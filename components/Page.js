import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Head from 'next/head';
import { Grommet, Responsive, Box } from 'grommet';
import Header from './Header';
import Footer from './Footer';
import connect from '../redux';
import { updateResponsive } from '../redux/nav/actions';

class Page extends React.Component {
  onResponsive = (size) => {
    this.props.updateResponsive(size === 'narrow');
  };

  render() {
    const {
      children, title: pageTitle, description, themes: { themes, selected: theme }, navMenu,
    } = this.props;
    const keywords = ['grommet', 'grommet 2', 'react', 'next-js', 'next.js', 'dashboard', 'npm'];
    if (pageTitle) {
      keywords.push(pageTitle);
    }
    return (
      <div>
        <Head>
          {pageTitle && (
            <title>{`Grommet Dashboard - ${pageTitle}`}</title>
            )
          }
          {typeof description === 'string' && (
            <meta name='description' content={description} />
            )
          }
          <meta name='keywords' content={keywords.join(',')} />
        </Head>
        <Grommet theme={themes[theme] || {}} style={{ height: 'auto', minHeight: '100vh' }}>
          <Responsive onChange={this.onResponsive}>
            <Box style={{ height: 'auto', minHeight: '100vh' }}>
              <Header title={pageTitle} />
              <Box flex={true} background='light-1' pad={{ horizontal: navMenu.responsive ? 'small' : 'xlarge', vertical: 'large' }}>
                {children}
              </Box>
              <Footer />
            </Box>
          </Responsive>
        </Grommet>
      </div>
    );
  }
}

Page.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

Page.defaultProps = {
  description: undefined,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateResponsive }, dispatch);

const mapStateToProps = state => ({
  themes: state.themes,
  navMenu: state.nav,
});


export default connect(mapStateToProps, mapDispatchToProps)(Page);

