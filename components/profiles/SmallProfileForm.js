import React from 'react';
import { Box } from 'grommet';
import { ImageStamp, TextInputField, EmailInputField, TextAreaField, PasswordInputField, validators } from 'grommet-controls';
import CardForm from '../forms/CardForm';

export default () => (
  <CardForm
    object={{
      company: 'Assassins inc.',
      username: 'jwick',
      email: 'jwick@assasins.com',
      first_name: 'John',
      last_name: 'Wick',
      address: '4066 Sunflower str',
      city: 'Cupertino',
      zip_code: 95350,
      country: 'USA',
      bio: `
Legendary assassin retired from his violent career after marrying the love of his life.
Her sudden death leaves John in deep mourning and when sadistic mobster Iosef Tarasov and his thugs
steal John's prized car and kill the puppy that was a last gift from his wife,
John unleashes the remorseless killing machine within and seeks vengeance.
      `,
    }}
    title='My Profile'
    submitLabel='Save'
  >
    <Box direction='row' gap='large' align='center'>
      <Box>
        <ImageStamp
          src='//v2.grommet.io/assets/Wilderpeople_Ricky.jpg'
          round='full'
          size='large'
        />
      </Box>
      <Box fill='horizontal'>
        <TextInputField label='User name' name='username' validation={[validators.required()]} />
      </Box>
    </Box>
    <TextAreaField rows='6' label='Short bio' name='bio' />
    <EmailInputField label='Email' name='email' validation={[validators.required(), validators.email()]} />
    <PasswordInputField
      label='Password'
      name='password'
      validation={
        [validators.required(), validators.minLength(5), validators.alphaNumeric()]
      }
    />
  </CardForm>
);
