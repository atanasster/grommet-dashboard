// eslint-disable-next-line camelcase
import { black, materiallight, materialdark, metro } from 'grommet-controls/themes';
import { dark, grommet } from 'grommet/themes';
import * as ActionTypes from './constants';


const defaultTheme = 'light';
const colors = {
  'brand': '#ffffff',
  'border-light': 'rgba(0, 0, 0, 0.10)',
  'border-dark': 'rgba(255, 255, 255, 0.10)',
  'focus': '#3679d2',
  'accent-1': '#367bd5',
  'accent-2': '#5ec660',
  'accent-3': '#d4293d',
  'accent-4': '#9C27B0',
  'neutral-1': '#795548',
  'neutral-2': '#CDDC39',
  'neutral-3': '#607D8B',
  'neutral-4': '#9cb6d7',
  'neutral-5': '#FF9800',
};

const baseSpacing = 16;

const lightTheme = {
  global: {
    colors,
    font: {
      family: "'Montserrat', sans-serif;",
      face: `
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 300;
          src: local('Montserrat Light'), local('Montserrat-Light'), url(https://fonts.gstatic.com/s/montserrat/v12/JTURjIg1_i6t8kCHKm45_cJD3gnD_vx3rCs.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 400;
          src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v12/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 600;
          src: local('Montserrat SemiBold'), local('Montserrat-SemiBold'), url(https://fonts.gstatic.com/s/montserrat/v12/JTURjIg1_i6t8kCHKm45_bZF3gnD_vx3rCs.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 700;
          src: local('Montserrat Bold'), local('Montserrat-Bold'), url(https://fonts.gstatic.com/s/montserrat/v12/JTURjIg1_i6t8kCHKm45_dJE3gnD_vx3rCs.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
      `,
      size: '14px',
    },
    edgeSize: {
      none: '0',
      hair: '1px', // for Chart
      xxsmall: `${baseSpacing / 8}px`, // 3
      xsmall: `${baseSpacing / 4}px`, // 6
      small: `${baseSpacing / 2}px`, // 12
      medium: `${baseSpacing}px`, // 24
      large: `${baseSpacing * 2}px`, // 48
      xlarge: `${baseSpacing * 4}px`, // 96
      narrow: {
        none: '0',
        hair: '1px', // for Chart
        xxsmall: '2px',
        xsmall: `${baseSpacing / 8}px`, // 3
        small: `${baseSpacing / 4}px`, // 6
        medium: `${baseSpacing / 2}px`, // 12
        large: `${baseSpacing}px`, // 24
        xlarge: `${baseSpacing * 2}px`, // 48
      },
    },
    hover: {
      background: {
        dark: {
          color: '#e3e3e3',
          opacity: 'none',
        },
        light: {
          color: '#316cbe',
          opacity: 'medium',
        },
      },
      color: {
        dark: 'white',
        light: 'black',
      },
    },
    control: {
      color: {
        dark: '#ffffff',
        light: '#333333',
      },
    },
  },
  text: {
    xsmall: { size: '10px', height: 1.5 },
    small: { size: '12px', height: 1.43 },
    medium: { size: '14px', height: 1.375 },
    large: { size: '20px', height: 1.167 },
    xlarge: { size: '28px', height: 1.1875 },
    xxlarge: { size: '26px', height: 1.125 },
  },
  heading: {
    font: false,
  },
  icon: {
    size: {
      xsmall: '14px',
    },
  },
  button: {
    border: {
      // color: { dark: undefined, light: undefined }
      radius: '1px',
      color: '#28599e',
    },
    // color: { dark: undefined, light: undefined }
    primary: {
      color: {
        dark: '#e9e9e9',
        light: '#316cbe',
      },
    },
  },
  anchor: {
    textDecoration: 'none',
    fontWeight: 600,
    color: {
      dark: '#69a1ff',
      light: '#316cbe',
    },
  },
  checkBox: {
    border: {
      color: {
        dark: 'rgba(255, 255, 255, 0.5)',
        light: 'rgba(0, 0, 0, 0.15)',
      },
      radius: '4px',
      width: '2px',
    },
    check: {
      color: {
        dark: '#ffffff',
        light: '#333333',
      },
      width: '4px',
    },
    icons: {
      // checked: undefined,
    },
  },
};

const initialState = {
  themes: {
    light: lightTheme,
    grommet,
    dark,
    black,
    materiallight,
    materialdark,
    metro,
  },
  selected: defaultTheme,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SELECT_THEME:
      return { ...state, selected: state.themes[action.name] ? action.name : defaultTheme };
    default:
      return state;
  }
};
