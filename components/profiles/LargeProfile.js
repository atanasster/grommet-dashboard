import React from 'react';
import { Box, Heading, Paragraph, Image, Button } from 'grommet';
import { Twitter } from 'grommet-icons';
import { ImageStamp, Card } from 'grommet-controls';

export default ({
  background, avatar, name, bio, twitterURL,
}) => (
  <Card>
    <Card.CardTitle pad='none' basis='small'>
      <Box style={{ position: 'relative' }} height='small' width='full'>
        <Image
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
          }}
          fit='cover'
          src={background}
        />
        <ImageStamp
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            marginTop: '-48px',
            marginLeft: '-48px',
            width: '96px',
            height: '96px',
            border: '3px solid white',
          }}
          src={avatar}
          round='full'
        />
      </Box>
    </Card.CardTitle>
    <Card.CardContent responsive={false} pad={{ top: 'large', bottom: 'medium' }}>
      <Box align='center' pad='large' gap='medium'>
        <Heading level={3} margin='none'>
          {name}
        </Heading>
        <Paragraph textAlign='center' margin='none'>
          {bio}
        </Paragraph>
      </Box>
      <Box direction='row'>
        <Box align='center' fill='horizontal'>
          <Button href={twitterURL} target='_blank' icon={<Twitter color='plain' />} label='Follow' onClick={() => {}} />
        </Box>
      </Box>
    </Card.CardContent>
  </Card>
);
