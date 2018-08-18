import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { bindActionCreators } from 'redux';
import { Box, Heading, Select, Layer, Button, Text, Menu } from 'grommet';
import {
  Menu as MenuIcon, Grommet as GrommetIcon, Home, TextAlignCenter,
  CheckboxSelected, Document, Gallery, Cubes,
} from 'grommet-icons';
import { ImageStamp } from 'grommet-controls';
import routerPush from './Router';
import AlertsMenu from './AlertsMenu/AlertsMenu';
import MenuBar from './MenuBar/MenuBar';
import connect from '../redux';
import RoutedButton from './RoutedButton';
import RoutedAnchor from './RoutedAnchor';
import { npmSetPackages } from '../redux/npm/actions';
import { selectTheme } from '../redux/themes/actions';
import { navActivate } from '../redux/nav/actions';

const trendingNPM = [
  [
    'material-ui',
    'semantic-ui-react',
    'react-bootstrap',
    'antd',
    'office-ui-fabric-react',
    'grommet',
  ],
  [
    'react',
    'angular',
    'vue',
    'jquery',
  ],
  [
    'next',
    'gatsby',
    'nuxt',
    'razzle',
  ],
  [
    '@tensorflow/tfjs',
    'keras-js',
    'brain.js',
  ],

];
class Header extends React.Component {
  componentDidMount() {
    this.props.navActivate(false);
  }

  onResponsiveMenu = () => {
    const { navMenu: { active } } = this.props;
    this.props.navActivate(!active);
  };

  onCloseMenu = () => {
    this.props.navActivate(false);
  };
  onThemeChange = ({ option: theme }) => {
    const { onChangeTheme } = this.props;
    console.log(this.props);
    onChangeTheme(theme);
  };
  onSetPackages = (packages) => {
    const { router } = this.props;
    routerPush(router, '/', { packages: packages.join(',') });
  };

  render() {
    const {
      title: pageTitle, themes: { themes, selected: theme }, navMenu,
    } = this.props;
    const toolbarItems = [
      { path: '/', label: 'home', icon: <Home size='xsmall' /> },
      { path: '/typography', label: 'typography', icon: <TextAlignCenter size='xsmall' /> },
      { path: '/icons', label: 'icons', icon: <GrommetIcon size='xsmall' /> },
      {
        label: 'components',
        icon: <Cubes size='xsmall' />,
        items: [
          { path: '/maps', label: 'Maps' },
          { path: '/tables', label: 'Tables' },
          { path: '/notifications', label: 'Notifications' },
        ],
      },
      {
        label: 'pages',
        icon: <Document size='xsmall' />,
        items: [
          { path: '/profile', label: 'Profile' },
          { path: '/login', label: 'Login' },
          { path: '/register', label: 'Register' },
          { path: '/forgot_password', label: 'Forgot password' },
          { path: '/email', label: 'Email' },
          { path: '/400', label: '400 error' },
          { path: '/401', label: '401 error' },
          { path: '/403', label: '403 error' },
          { path: '/404', label: '404 error' },
          { path: '/500', label: '500 error' },
          { path: '/503', label: '503 error' },
        ],
      },
      { path: '/forms', label: 'forms', icon: <CheckboxSelected size='xsmall' /> },
      { path: '/gallery', label: 'gallery', icon: <Gallery size='xsmall' /> },
    ];
    const keywords = ['grommet', 'grommet 2', 'react', 'next-js', 'next.js', 'dashboard', 'npm'];
    if (pageTitle) {
      keywords.push(pageTitle);
    }
    const themeSelector = (
      <Box direction='row'>
        <Box basis='medium' >
          <Select
            a11yTitle='Change theme'
            value={theme}
            options={Object.keys(themes)}
            onChange={this.onThemeChange}
          />
        </Box>
      </Box>
    );
    const avatar = (
      <Menu
        dropAlign={{ top: 'bottom', right: 'right' }}
        items={[
          { label: 'Profile', onClick: () => {} },
          { label: 'Settings', onClick: () => {} },
          { label: 'Subscriptions', onClick: () => {} },
          { label: 'Inbox', onClick: () => {} },
        ]}
      >
        <Box direction='row' align='center' gap='small'>
          <ImageStamp
            src='//v2.grommet.io/assets/Wilderpeople_Ricky.jpg'
            size='medium'
            round='full'
          />
          <Box>
            <Text weight='bold'>Adam Levine</Text>
            <Text size='small'>Singer</Text>
          </Box>
        </Box>
      </Menu>
    );
    let menu;
    if (navMenu.responsive) {
      if (navMenu.active) {
        menu = (
          <Layer plain={true} onEsc={this.onCloseMenu} position='left' onClickOverlay={this.onCloseMenu}>
            <Box background='brand' gap='small' style={{ height: '100vh' }} pad={{ vertical: 'small' }} align='start'>
              <Button icon={<MenuIcon />} onClick={this.onResponsiveMenu} />
              <Box pad={{ vertical: 'small', horizontal: 'medium' }} gap='small'>
                {themeSelector}
                {toolbarItems.map(item => (
                  <RoutedAnchor key={`menu_${item.path || item.label}`} primary={true} {...item} />
                ))}
              </Box>
            </Box>
          </Layer>
        );
      }
    } else {
      menu = (
        <Box direction='row' align='center' justify='end' gap='medium' tag='nav'>
          {themeSelector}
          <AlertsMenu
            alerts={trendingNPM.map(t => (
              { label: t.join(' vs '), onClick: () => this.onSetPackages(t) }
            ))}
          />
          {avatar}
        </Box>
      );
    }
    return (
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
              <Button icon={<MenuIcon />} onClick={this.onResponsiveMenu} />
            )}
            <Heading level='3' margin='none'>
              <RoutedButton path='/'>
                  grommet dashboard
              </RoutedButton>
            </Heading>
          </Box>
          {menu}
        </Box>
        {!navMenu.responsive && (
          <MenuBar
            items={toolbarItems}
          />
        )}
      </Box>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onChangeTheme: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectTheme, navActivate, npmSetPackages }, dispatch);

const mapStateToProps = state => ({
  themes: state.themes,
  navMenu: state.nav,
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

