import type { NextPage } from 'next';
import NextLink from 'next/link';
import { TextInput, PasswordInput, Button, Box, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
import { NextApi } from '../../utils/axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { UserMapped } from '../../utils/types';
import { handleClientError } from '../../utils/handleError';
import { useUserContext } from '../../contexts/user';
import { APP_PATHS, NEXT_API_PATHS } from '../../utils/constans';

const SingIn: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [, setUser] = useUserContext();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleSubmit = async (values: typeof form.values): Promise<void> => {
    const requestBody = {
      email: values.email,
      password: values.password,
    };
    try {
      setLoading(true);
      const { data } = await NextApi.post<UserMapped>(
        NEXT_API_PATHS.signIn,
        requestBody,
      );
      setUser(data);
      router.push(APP_PATHS.main);
    } catch (e: unknown) {
      handleClientError(e, 'SignIn Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto" mt="20%">
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
          mb="sm"
          label="Password"
          required
          {...form.getInputProps('password')}
          disabled={loading}
        />

        <NextLink passHref href="/signUp">
          <Anchor>Sign Up</Anchor>
        </NextLink>

        <Button type="submit" fullWidth mt="md" disabled={loading}>
          Sign In
        </Button>
      </form>
    </Box>
  );
};

export default SingIn;
