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

const SignUp: NextPage = () => {
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

  return (
    <Box
      sx={{ maxWidth: 300, transform: 'translateY(-100%)' }}
      mx="auto"
      mt="50%"
    >
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />

        <PasswordInput
          mt="md"
          label="Password"
          required
          {...form.getInputProps('password')}
        />

        <PasswordInput
          mt="md"
          mb="sm"
          required
          label="Repeat Password"
          {...form.getInputProps('repeatPassword')}
        />

        <Group>
          <Text>Already have account?</Text>
          <NextLink passHref href="/signIn">
            <Anchor>Sign In</Anchor>
          </NextLink>
        </Group>

        <Button type="submit" fullWidth mt="md">
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default SignUp;
