import React from 'react';
import { Box, Text } from 'grommet';
import { PasswordInputField, EmailInputField, CheckBoxField, validators } from 'grommet-controls';
import FormLayout from '../components/layouts/FormLayout';
import RoutedAnchor from '../components/RoutedAnchor';

export default () => (
  <FormLayout
    title='Login to your account'
    submitLabel='Sign in'
    footer={(
      <Box direction='row' alignSelf='center' gap='small' align='center'>
        <Text>
          {'Don\'t have an account yet?'}
        </Text>
        <RoutedAnchor path='/register' label='Sign up' />
      </Box>
    )}
  >
    <EmailInputField
      label='Email'
      name='email'
      validation={[validators.required(), validators.email()]}
    />
    <PasswordInputField
      label={(
        <Box direction='row' align='center' justify='between'>
          Password
          <RoutedAnchor path='/reset_password' size='small' label='Forgot password?' />
        </Box>
      )}
      description='Password'
      name='password'
      validation={
        [validators.required(), validators.minLength(5), validators.alphaNumeric()]
      }
    />
    <CheckBoxField
      label='Remember me'
      name='rememberme'
      inField={false}
    />
  </FormLayout>
);
