import React from 'react';
import { Box, Text } from 'grommet';
import { TextInputField, EmailInputField, TextAreaField, SelectField } from 'grommet-controls/components/Form/Fields';
import validators from 'grommet-controls/components/Form/validators';
import FormLayout from '../components/Layouts/FormLayout';
import RoutedAnchor from '../components/RoutedAnchor';

export default () => (
  <FormLayout
    basis='large'
    pageTitle='Profile'
    title='Edit profile'
    submit='Save profile'
    footer={(
      <Box direction='row' alignSelf='center' gap='small' align='center'>
        <Text>
          {'Already have an account?'}
        </Text>
        <RoutedAnchor path='/login' label='Sign in' />
      </Box>
    )}
  >
    <Box direction='row' gap='medium'>
      <Box basis='1/3'>
        <TextInputField label='Company' name='company' />
      </Box>
      <Box basis='1/3'>
        <TextInputField label='User name' name='username' validation={[validators.required()]} />
      </Box>
      <Box basis='1/3'>
        <EmailInputField label='Email' name='email' validation={[validators.required(), validators.email()]} />
      </Box>
    </Box>
    <Box direction='row' gap='medium'>
      <Box basis='1/2'>
        <TextInputField label='First name' name='first_name' />
      </Box>
      <Box basis='1/2'>
        <TextInputField label='Last name' name='last_name' />
      </Box>
    </Box>
    <TextInputField label='Address' name='address' />
    <Box direction='row' gap='medium'>
      <Box basis='1/3'>
        <TextInputField label='City' name='city' validation={[validators.required()]} />
      </Box>
      <Box basis='1/3'>
        <TextInputField
          label='Zip code'
          name='zip_code'
          validation={[validators.required(), validators.numeric(), validators.minLength(5)]}
        />
      </Box>
      <Box basis='1/3'>
        <SelectField
          label='Country'
          name='country'
          options={['USA', 'England', 'France']}
          validation={[validators.required()]}
        />
      </Box>
    </Box>
    <TextAreaField rows='6' label='Short bio' name='bio' />
  </FormLayout>
);
