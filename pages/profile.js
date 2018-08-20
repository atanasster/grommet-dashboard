import React from 'react';
import { Box } from 'grommet';
import { Twitter, Facebook, Linkedin, GooglePlus } from 'grommet-icons';
import SiteLayout from '../components/layouts/SiteLayout';
import LargeProfile from '../components/profiles/LargeProfile';
import SmallProfile from '../components/profiles/SmallProfile';
import LargeProfileForm from '../components/profiles/LargeProfileForm';
import SmallProfileForm from '../components/profiles/SmallProfileForm';

export default class ProfilePage extends React.Component {
  render() {
    return (
      <SiteLayout title='Profile'>
        <Box direction='row-responsive' gap='large'>
          <Box basis='1/3' gap='large' >
            <LargeProfile
              background='//v2.grommet.io/assets/IMG_4245.jpg'
              avatar='//v2.grommet.io/assets/Wilderpeople_Ricky.jpg'
              name='John Wick'
              bio='Legendary assassin retired from his violent career after marrying the love of his life.'
              twitterURL='https://twitter.com/grommetux'
            />
            <SmallProfile
              avatar='//v2.grommet.io/assets/Wilderpeople_Ricky.jpg'
              name='John Wick'
              description='Legendary assassin'
              icons={[
                { icon: <Twitter color='plain' />, href: 'https://twitter.com/grommetux' },
                { icon: <Facebook color='plain' />, href: 'https://twitter.com/grommetux' },
                { icon: <Linkedin color='plain' />, href: 'https://twitter.com/grommetux' },
                { icon: <GooglePlus color='plain' />, href: 'https://twitter.com/grommetux' },
              ]}
            />

            <SmallProfileForm />
          </Box>
          <Box basis='2/3' align='center'>
            <LargeProfileForm />
          </Box>
        </Box>
      </SiteLayout>
    );
  }
}
