import React from 'react';
import { Box, Grid } from 'grommet';
import { Favorite } from 'grommet-icons';
import SiteLayout from '../components/layouts/SiteLayout';
import VerticalPostCard from '../components/blog/VerticalPostCard';

const VerticalPost = (...props) => (
  <VerticalPostCard
    image='//v2.grommet.io/assets/IMG_4245.jpg'
    title='John Wick'
    path='https://www.imdb.com/title/tt2911666/'
    excerpt={`
Legendary assassin retired from his violent career after marrying the love of his life.
Her sudden death leaves John in deep mourning and when sadistic mobster Iosef Tarasov and his thugs
steal John's prized car and kill the puppy that was a last gift from his wife,
John unleashes the remorseless killing machine within and seeks vengeance.
              `}
    authorName='John Doe'
    authorImage='//v2.grommet.io/assets/Wilderpeople_Ricky.jpg'
    authorDescription='15 min. ago'
    icons={[{ icon: <Favorite />, onClick: () => alert('Great post') }]}
    {...props}
  />
);

export default class ProfilePage extends React.Component {
  render() {
    const componentsArray = (Component, name, size) => {
      const arr = [];
      for (let i = 0; i < size; i += 1) {
        arr.push(<Component key={`${name}_${i}`} />);
      }
      return arr;
    };
    return (
      <SiteLayout title='Profile'>
        <Box direction='row-responsive' gap='large'>
          <Box basis='1/3' gap='large' >
            <VerticalPost />
          </Box>
          <Box basis='2/3' flex={false}>
            <Grid columns='small' gap='small'>
              {componentsArray(VerticalPost, 'vertical_post', 4)}
            </Grid>
          </Box>
        </Box>
      </SiteLayout>
    );
  }
}
