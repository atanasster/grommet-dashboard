import React from 'react';
import { Box, Grid } from 'grommet';
import { Favorite } from 'grommet-icons';
import SiteLayout from '../components/layouts/SiteLayout';
import VerticalPost from '../components/blog/VerticalPost';
import HorizontalPost from '../components/blog/HorizontalPost';

const Post = ({ Component, ...props }) => (
  <Component
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

export default () => {
  const componentsArray = (Component, name, size, props) => {
    const arr = [];
    for (let i = 0; i < size; i += 1) {
      arr.push(<Post Component={Component} key={`${name}_${i}`} {...props} />);
    }
    return arr;
  };
  return (
    <SiteLayout title='Blog'>
      <Box gap='large' flex={false} full='horizontal'>
        <Grid columns='medium' gap='small'>
          {componentsArray(VerticalPost, 'vertical_post', 5)}
        </Grid>
        <Grid columns='medium' gap='small'>
          {componentsArray(HorizontalPost, 'vertical_post', 5)}
        </Grid>
        <Grid columns='medium' gap='small'>
          {componentsArray(HorizontalPost, 'vertical_post', 5, { image: undefined })}
        </Grid>
      </Box>
    </SiteLayout>
  );
};
