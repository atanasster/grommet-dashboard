import React from 'react';
import { Box, Text, Paragraph } from 'grommet';
import { EmailInputField, validators } from 'grommet-controls';
import FormLayout from '../components/layouts/FormLayout';
import RoutedAnchor from '../components/RoutedAnchor';

export default () => (
  <FormLayout
    title='Recover password'
    submitLabel='Reset my password'
    footer={(
      <Box direction='row' alignSelf='center' gap='small' align='center'>
        <Text>
          {'Remembered your password?'}
        </Text>
        <RoutedAnchor path='/login' label='Sign in' />
      </Box>
    )}
    onSubmit={({ email }) => alert(`an email was sent to ${email}`)}
  >
    <Paragraph size='small'>
      Enter your email address below and we will send you an email to reset your password.
    </Paragraph>
    <EmailInputField
      label='Email address'
      name='email'
      validation={[validators.required(), validators.email()]}
    />
  </FormLayout>
);
