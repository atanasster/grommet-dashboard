import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { bindActionCreators } from 'redux';
import Head from 'next/head';
import { Grommet, Responsive, Box } from 'grommet';
import Header from './Header';
import Footer from './Footer';
import connect from '../redux';
import { selectTheme } from '../redux/themes/actions';
import { updateResponsive } from '../redux/nav/actions';

class Page extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.changeTheme(props.router.query.theme);
  }

  changeTheme(theme) {
    this.theme = theme;
    this.props.selectTheme(theme);
  }

   onChangeTheme = (theme) => {
     const { router } = this.props;
     const path = { pathname: router.pathname, query: { ...router.query, theme } };
     this.changeTheme(theme);
     router.replace(path, path, { shallow: true });
   };


   componentWillReceiveProps(nextProps) {
     if (nextProps.router.query.theme !== this.theme) {
       this.props.selectTheme(nextProps.router.query.theme);
     }
   }
  onResponsive = (size) => {
    this.props.updateResponsive(size === 'narrow');
  };

  render() {
    const {
      children, title: pageTitle, description, themes: { themes }, navMenu,
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
        <Grommet theme={themes[this.theme] || {}} style={{ height: 'auto', minHeight: '100vh' }}>
          <Responsive onChange={this.onResponsive}>
            <Box style={{ height: 'auto', minHeight: '100vh' }}>
              <Header title={pageTitle} onChangeTheme={this.onChangeTheme} />
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
  bindActionCreators({ updateResponsive, selectTheme }, dispatch);

const mapStateToProps = state => ({
  themes: state.themes,
  navMenu: state.nav,
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page));

