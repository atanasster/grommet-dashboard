import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { bindActionCreators } from 'redux';
import { Box, Heading, Select, Layer, Button, Menu } from 'grommet';
import {
  Menu as MenuIcon, Grommet as GrommetIcon, Home, TextAlignCenter,
  Document, Cubes, UserSettings as UserIcon, Paint,
} from 'grommet-icons';
import { VerticalMenu, Avatar, Header } from 'grommet-controls';
import routerPush from '../PushRoute';
import AlertsMenu from '../AlertsMenu/AlertsMenu';
import MenuBar from '../MenuBar/MenuBar';
import connect from '../../redux/index';
import RoutedButton from '../RoutedButton';
import { npmSetPackages } from '../../redux/npm/actions';
import { selectTheme } from '../../redux/themes/actions';

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
  [
    'redux',
    'mobx',
    'flux',
    'relay',
  ],
  [
    'lodash',
    'underscore',
    'ramda',
  ],
  [
    'react-codemirror2',
    'react-ace',
    'react-monaco-editor',
  ],
];
class AppBar extends React.Component {
  state = {
    activeMenu: false,
  };

  onResponsiveMenu = () => {
    this.setState({ activeMenu: !this.state.activeMenu });
  };

  onCloseMenu = () => {
    this.setState({ activeMenu: false });
  };

  onThemeChange = ({ option: theme }) => {
    const { onChangeTheme } = this.props;
    onChangeTheme(theme);
  };
  onSetPackages = (packages) => {
    routerPush({ route: '/', params: { packages: packages.join(',') } });
  };

  routeProps = path => ({
    route: path,
    onClick: (e) => {
      e.preventDefault();
      routerPush({ route: path });
    },
  });

  render() {
    const {
      title: pageTitle, themes: { themes, selected: theme }, size,
    } = this.props;
    const isNarrow = size === 'small';
    const isWide = size !== 'small';
    const toolbarItems = [
      { path: '/', label: 'home', icon: <Home size='small' /> },
      { path: '/typography', label: 'typography', icon: <TextAlignCenter size='small' /> },
      { path: '/components', label: 'components', icon: <Cubes size='small' /> },
      { path: '/colors', label: 'colors', icon: <Paint size='small' /> },
      { path: '/icons', label: 'icons', icon: <GrommetIcon size='small' /> },
      {
        label: 'interface',
        icon: <Document size='small' />,
        items: [
          { path: '/profile', label: 'Profile' },
          { path: '/login', label: 'Login' },
          { path: '/register', label: 'Register' },
          { path: '/reset_password', label: 'Recover password' },
          { path: '/400', label: '400 error' },
          { path: '/blog', label: 'Blog' },
          { path: '/maps', label: 'Maps' },
          { path: '/tables', label: 'Tables' },
          { path: '/charts', label: 'Charts' },
          { path: '/notifications', label: 'Notifications' },
        ],
      },
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
    const userMenus = [
      { ...this.routeProps('/edit_profile'), label: 'Edit profile' },
      { ...this.routeProps('/subscriptions'), label: 'Subscriptions' },
      { ...this.routeProps('/inbox'), label: 'Inbox' },
    ];
    const avatar = (
      <Menu
        dropAlign={{ top: 'bottom', right: 'right' }}
        items={userMenus}
      >
        <Avatar
          image='//v2.grommet.io/assets/Wilderpeople_Ricky.jpg'
          title='John Wick'
          subTitle='Assassin'
        />
      </Menu>
    );
    let menu;
    if (isNarrow) {
      if (this.state.activeMenu) {
        menu = (
          <Layer
            full='vertical'
            modal={true}
            responsive={false}
            onEsc={this.onCloseMenu}
            position='left'
            onClickOutside={this.onCloseMenu}
          >
            <Box direction='row'>
              <Box background='brand' gap='small' pad='small' width='medium' align='start'>
                <Button icon={<MenuIcon />} onClick={this.onResponsiveMenu} />
                <Box pad={{ vertical: 'small', horizontal: 'medium' }} gap='small' flex={true} fill='horizontal'>
                  <VerticalMenu
                    buttonClass={RoutedButton}
                    basis='small'
                    items={[
                      {
                        label: 'John Wick',
                        icon: <UserIcon size='small' />,
                        items: userMenus,
                      },
                      ...toolbarItems,
                    ]}
                  />
                </Box>
              </Box>
            </Box>
          </Layer>
        );
      }
    } else if (isWide) {
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
      <Header
        position='sticky'
      >
        <Box direction='row' align='center' gap='small' pad={{ horizontal: 'small' }}>
          {isNarrow && (
            <Button icon={<MenuIcon />} onClick={this.onResponsiveMenu} />
          )}
          <Heading level='3' margin='none'>
            <RoutedButton path='/'>
                grommet dashboard
            </RoutedButton>
          </Heading>
        </Box>
        {!isNarrow && (
          <MenuBar
            items={toolbarItems}
          />
        )}
        {menu}
      </Header>
    );
  }
}

AppBar.defaultProps = {
  size: undefined,
};

AppBar.propTypes = {
  title: PropTypes.string.isRequired,
  onChangeTheme: PropTypes.func.isRequired,
  size: PropTypes.string,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectTheme, npmSetPackages }, dispatch);

const mapStateToProps = state => ({
  themes: state.themes,
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppBar));

