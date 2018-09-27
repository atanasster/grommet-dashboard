import React from 'react';
import { Box, WorldMap } from 'grommet';
import GoogleMap from 'google-map-react';
import { Card } from 'grommet-controls';
import SiteLayout from '../components/layouts/SiteLayout';
import Title from '../components/layouts/Title';

export default () => (
  <SiteLayout title='Maps'>
    <Title label='Maps' />
    <Box fill='horizontal' align='center' gap='large'>
      <Card width='large'>
        <Card.CardTitle>
          WorldMap
        </Card.CardTitle>
        <Card.CardContent fill='horizontal'>
          <WorldMap
            color='neutral-1'
            continents={[
                  {
                    name: 'Africa',
                    color: 'accent-1',
                    onClick: name => alert(name),
                  },
                  {
                    name: 'Europe',
                    color: 'accent-2',
                    onClick: name => alert(name),
                  },
                  {
                    name: 'Asia',
                    color: 'accent-3',
                    onClick: name => alert(name),
                  },
                  {
                    name: 'North America',
                    color: 'accent-4',
                    onClick: name => alert(name),
                  },
                  {
                    name: 'South America',
                    color: 'neutral-1',
                    onClick: name => alert(name),
                  },
                  {
                    name: 'Australia',
                    color: 'neutral-2',
                    onClick: name => alert(name),
                  },
                ]}
            onSelectPlaceX={(lat, lon) => alert(lat, lon)}
            places={[
                  {
                    name: 'Sydney',
                    location: [-33.8830555556, 151.216666667],
                    color: 'status-error',
                    onClick: name => alert(name),
                  },
                ]}
            selectColor='accent-2'
          />
        </Card.CardContent>
      </Card>
      <Card>
        <Card.CardTitle>
          Google Map
        </Card.CardTitle>
        <Box fill='horizontal' height='medium'>
          <GoogleMap
            apiKey={undefined}
            defaultCenter={{ lat: 59.938043, lng: 30.337157 }}
            defaultZoom={7}
          />
        </Box>
      </Card>
    </Box>
  </SiteLayout>
);
