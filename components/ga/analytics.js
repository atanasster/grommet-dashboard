import ReactGA from 'react-ga';


export const initGA = () => {
  if (process.env.GOOGLE_ANALYTICS) {
    ReactGA.initialize(process.env.GOOGLE_ANALYTICS);
  }
};

export const logPageView = () => {
  if (process.env.GOOGLE_ANALYTICS) {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }
};

export const logEvent = (category = '', action = '') => {
  if (process.env.GOOGLE_ANALYTICS) {
    if (category && action) {
      ReactGA.event({ category, action });
    }
  }
};

export const logException = (description = '', fatal = false) => {
  if (process.env.GOOGLE_ANALYTICS && description) {
    ReactGA.exception({ description, fatal });
  }
};
