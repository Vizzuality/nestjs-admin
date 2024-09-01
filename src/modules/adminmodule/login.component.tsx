import React, { useState } from 'react';
import { useTranslation } from 'adminjs';
import {
  Box,
  Button,
  FormGroup,
  Input,
  Label,
  Text,
  H1,
} from '@adminjs/design-system';

const CustomLogin: React.FC = () => {
  const { translateButton, translateLabel } = useTranslation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form.username.value;
    const password = form.password.value;

    const response = await fetch('/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      window.location.href = '/admin';
    } else {
      setErrorMessage('Invalid credentials, please try again.');
    }
  };

  return (
    <Box
      flex
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="grey"
    >
      <Box
        as="form"
        onSubmit={handleSubmit}
        width="100%"
        maxWidth="360px"
        p="30px"
        bg="white"
        borderRadius="lg"
        boxShadow="card"
      >
        <H1 color="primary100" textAlign="center">
          {translateLabel('adminJSCustomLoginTitle', {
            defaultValue: 'Vizz CMS',
          })}
        </H1>
        <Text textAlign="center" mb="20px">
          {translateLabel('adminJSCustomLoginText', {
            defaultValue: 'Strapi is a pain, so try this out',
          })}
        </Text>

        {errorMessage && (
          <Text color="error" mb="20px">
            {errorMessage}
          </Text>
        )}

        <FormGroup>
          <Label htmlFor="username">
            {translateLabel('username', { defaultValue: 'Username' })}
          </Label>
          <Input name="username" type="text" required />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">{translateLabel('password')}</Label>
          <Input name="password" type="password" required />
        </FormGroup>

        <Button variant="primary" width="100%" mt="20px" type="submit">
          {translateButton('login', { defaultValue: 'Login' })}
        </Button>
      </Box>
    </Box>
  );
};

export default CustomLogin;
