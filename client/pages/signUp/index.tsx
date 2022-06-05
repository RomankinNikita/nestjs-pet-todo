import type { NextPage } from 'next';
import NextLink from 'next/link';
import {
  TextInput,
  PasswordInput,
  Button,
  Box,
  Anchor,
  Text,
  Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { NextApi } from '../../utils/axios';
import { APP_PATHS, NEXT_API_PATHS } from '../../utils/constants';
import { useRouter } from 'next/router';
import { handleClientError } from '../../utils/handleError';
import { showNotification } from '@mantine/notifications';

const SignUp: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length < 3 ? 'Should be more than 3 symbols' : null,
      repeatPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  const handleSubmit = async (values: typeof form.values): Promise<void> => {
    const requestBody = {
      email: values.email,
      password: values.password,
    };
    try {
      setLoading(true);
      const response = await NextApi.post(
        NEXT_API_PATHS.signUp,
        requestBody,
      );
      if (response.status === 200) {
        router.push(APP_PATHS.main);
        showNotification({
          title: 'Congratulations!',
          message: 'New user has been created successfully',
          color: 'green',
          autoClose: false,
        });
      } else {
        throw new Error('Something went wrong... Try again')
      }
    } catch (e: unknown) {
      handleClientError(e, 'SignUp Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
    sx={{ maxWidth: 300 }} mx="auto" mt="20%"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
          disabled={loading}
        />

        <PasswordInput
          mt="md"
          label="Password"
          required
          {...form.getInputProps('password')}
          disabled={loading}
        />

        <PasswordInput
          mt="md"
          mb="sm"
          required
          label="Repeat Password"
          {...form.getInputProps('repeatPassword')}
          disabled={loading}
        />

        <Group>
          <Text>Already have account?</Text>
          <NextLink passHref href="/signIn">
            <Anchor>Sign In</Anchor>
          </NextLink>
        </Group>

        <Button type="submit" fullWidth mt="md" disabled={loading}>
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default SignUp;
