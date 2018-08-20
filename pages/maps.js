import React from 'react';
import { Box, WorldMap } from 'grommet';
import GoogleMap from 'google-map-react';
import SiteLayout from '../components/layouts/SiteLayout';
import { Card, CardTitle, CardContent } from '../components/Card';

export default () => (
  <SiteLayout title='Typography'>
    <Box fill='horizontal' align='center' gap='large'>
      <Card width='large'>
        <CardTitle>
          WorldMap
        </CardTitle>
        <CardContent>
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
        </CardContent>
      </Card>
      <Card>
        <CardTitle>
          Google Map
        </CardTitle>
        <Box width='large' height='medium'>
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
