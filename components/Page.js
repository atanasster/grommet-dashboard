import React from 'react';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Head from 'next/head';
import { Grommet, Responsive, Box, Heading, Select, Anchor, Layer, Button } from 'grommet';
import { Menu, Grommet as GrommetIcon, Home, TextAlignCenter, CheckboxSelected, Document, Gallery, Accessibility } from 'grommet-icons';
import connect from '../redux';
import RoutedButton from './RoutedButton';
import RoutedAnchor from './RoutedAnchor';
import NextJsAnchor from './Anchor';
import { selectTheme } from '../redux/themes/actions';
import { navActivate, updateResponsive } from '../redux/nav/actions';

class Page extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { theme: props.router.query.theme };
  }

  changeTheme(themeName) {
    this.props.selectTheme(themeName);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.router.query.theme !== this.state.theme) {
      this.setState({ theme: nextProps.router.query.theme });
    }
  }
  componentDidMount() {
    this.props.navActivate(false);
  }

  onResponsiveMenu = () => {
    const { navMenu: { active } } = this.props;
    this.props.navActivate(!active);
  };
  onResponsive = (size) => {
    this.props.updateResponsive(size === 'narrow');
  };


  onCloseMenu = () => {
    this.props.navActivate(false);
  };
  onThemeChange = ({ option: theme }) => {
    const { router } = this.props;
    const path = { pathname: router.pathname, query: { ...router.query, theme } };
    this.changeTheme(theme);
    router.replace(path, path, { shallow: true });
  };

  render() {
    const {
      children, title: pageTitle, description, nav, themes: { themes }, navMenu, footer,
    } = this.props;
    const { theme = 'light' } = this.state;
    const keywords = ['grommet', 'grommet 2', 'react', 'next-js', 'next.js', 'dashboard', 'npm'];
    if (pageTitle) {
      keywords.push(pageTitle);
    }
    const menuItems = [
      { external: 'https:///crypto-grommet.com', label: 'use-case' },
    ];
    const items = menuItems.map(item => (
      item.external ? (
        <NextJsAnchor target='_blank' key={item.label} path={item.external} label={item.label} />
      ) : (
        <RoutedAnchor key={item.label} path={item.path} label={item.label} />
      )
    ));
    const themeSelector = (
      <Box basis='small' >
        <Select
          a11yTitle='Change theme'
          value={theme}
          options={Object.keys(themes)}
          onChange={this.onThemeChange}
        />
      </Box>
    );
    let menu;
    if (navMenu.responsive) {
      if (navMenu.active) {
        menu = (
          <Layer plain={true} onEsc={this.onCloseMenu} position='left' onClickOverlay={this.onCloseMenu}>
            <Box background='brand' gap='small' style={{ height: '100vh' }} pad='medium'>
              <Button icon={<Menu />} onClick={this.onResponsiveMenu} />
              <RoutedAnchor path='/' label='home' a11yTitle='go to home page' />
              {items}
              {themeSelector}
            </Box>
          </Layer>
        );
      }
    } else {
      menu = (
        <Box direction='row' align='center' justify='end' gap='small' tag='nav'>
          {items}
          {themeSelector}
        </Box>
      );
    }
    return (
      <div>
        {nav && (
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
        )}
        <Grommet theme={themes[theme] || {}} style={{ height: 'auto', minHeight: '100vh' }}>
          <Responsive onChange={this.onResponsive}>
            <Box style={{ height: 'auto', minHeight: '100vh' }}>
              {nav && (
                <Box background='brand'>

                  <Box
                    tag='header'
                    direction='row-responsive'
                    justify='between'
                    align='center'
                    border='bottom'
                    pad={{ horizontal: !navMenu.responsive && 'xlarge', vertical: 'small' }}
                  >
                    <Box direction='row' align='center'gap='small' >
                      {navMenu.responsive && (
                        <Button icon={<Menu />} onClick={this.onResponsiveMenu} />
                      )}
                      <Heading level='3' margin='none'>
                        <RoutedButton path='/'>
                            grommet dashboard
                        </RoutedButton>
                      </Heading>
                    </Box>
                    {menu}
                  </Box>
                  <Box
                    tag='nav'
                    direction='row'
                    gap='large'
                    align='center'
                    border='bottom'
                    responsive={true}
                    pad={{ horizontal: 'xlarge', vertical: 'small' }}
                  >
                    <RoutedAnchor primary={true} path='/' label='home' icon={<Home size='xsmall' />} />
                    <RoutedAnchor primary={true} path='/typography' label='typography' icon={<TextAlignCenter size='xsmall' />} />
                    <RoutedAnchor primary={true} path='/icons' label='icons' icon={<GrommetIcon size='xsmall' />} />
                    <RoutedAnchor primary={true} path='/components' label='components' icon={<Accessibility size='xsmall' />} />
                    <RoutedAnchor primary={true} path='/pages' label='pages' icon={<Document size='xsmall' />} />
                    <RoutedAnchor primary={true} path='/forms' label='forms' icon={<CheckboxSelected size='xsmall' />} />
                    <RoutedAnchor primary={true} path='/gallery' label='gallery' icon={<Gallery size='xsmall' />} />
                  </Box>
                </Box>
               ) }
              <Box flex={true} background='light-1' pad={{ horizontal: navMenu.responsive ? 'small' : 'xlarge', vertical: 'large' }}>
                {children}
              </Box>
              {footer && (
                <Box
                  tag='footer'
                  direction='row'
                  justify='center'
                  fill='horizontal'
                  justifySelf={true}
                >
                  <Box
                    fill='horizontal'
                    border='top'
                    direction='row'
                    justify='center'
                    pad='medium'
                    gap='medium'
                  >
                    <Anchor
                      href='https://github.com/grommet/grommet/tree/NEXT'
                      target='_blank'
                      a11yTitle='Go to the github page for Grommet 2'
                    >
                      grommet
                    </Anchor>
                    <Anchor
                      href='https://github.com/atanasster/grommet-nextjs'
                      target='_blank'
                      a11yTitle='Go to the github page for this project'
                    >
                      git
                    </Anchor>
                    <Anchor
                      href='https://spectrum.chat/crypto-grommet'
                      target='_blank'
                      a11yTitle='Go to the spectrum community for this project'
                    >
                      spectrum
                    </Anchor>
                  </Box>
                </Box>)
              }
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
  nav: PropTypes.bool,
  footer: PropTypes.bool,
};

Page.defaultProps = {
  nav: true,
  footer: true,
  description: undefined,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectTheme, navActivate, updateResponsive }, dispatch);

const mapStateToProps = state => ({
  themes: state.themes,
  navMenu: state.nav,
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page));

