import React from 'react';
import { Box } from 'grommet';
import SiteLayout from '../components/Layouts/SiteLayout';
import LargeProfile from '../components/Profiles/LargeProfile';

export default class ProfilePage extends React.Component {
  render() {
    return (
      <SiteLayout title='Profile'>
        <Box direction='row' gap='large'>
          <Box basis='1/3' align='center' gap='large'>
            <LargeProfile
              background='//v2.grommet.io/assets/IMG_4245.jpg'
              avatar='//v2.grommet.io/assets/Wilderpeople_Ricky.jpg'
              name='John Wick'
              bio='Legendary assassin retired from his violent career after marrying the love of his life.'
              twitterURL='https://twitter.com/grommetux'
            />
          </Box>
          <Box basis='2/3' align='center'>
            2/3
          </Box>
        </Box>
      </SiteLayout>
    );
  }
}
