import React from 'react';
import { Box, Text } from 'grommet';
import { TextInputField, PasswordInputField, EmailInputField, CheckBoxField } from 'grommet-controls/components/Form/Fields';
import validators from 'grommet-controls/components/Form/validators';
import FormLayout from '../components/Layouts/FormLayout';
import RoutedAnchor from '../components/RoutedAnchor';

export default () => (
  <FormLayout
    pageTitle='Register'
    title='Register account'
    submit='Register'
    footer={(
      <Box direction='row' alignSelf='center' gap='small' align='center'>
        <Text>
          {'Already have an account?'}
        </Text>
        <RoutedAnchor path='/login' label='Sign in' />
      </Box>
    )}
  >
    <TextInputField label='User name' name='username' validation={[validators.required()]} />
    <EmailInputField label='Email' name='email' validation={[validators.required(), validators.email()]} />
    <PasswordInputField
      label='Password'
      name='password'
      validation={
        [validators.required(), validators.minLength(5), validators.alphaNumeric()]
      }
    />
    <PasswordInputField
      label='Confirm Password'
      name='password1'
      validation={[validators.equalsField('password')]}
    />
    <CheckBoxField
      controlLabel={(
        <Box direction='row' gap='small' align='center'>
          Agree to
          <RoutedAnchor path='/terms_of_service' size='small' label='terms of service' />
        </Box>
      )}
      description='Terms of service'
      name='accept_tos'
      validation={[validators.required(), validators.True('Please accept our TOS')]}
    />
  </FormLayout>
);
