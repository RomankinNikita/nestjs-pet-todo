import type { NextPage } from 'next';
import NextLink from 'next/link';
import { TextInput, PasswordInput, Button, Box, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';

const SingIn: NextPage = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
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
          mb="sm"
          label="Password"
          required
          {...form.getInputProps('password')}
        />

        <NextLink passHref href="/signUp">
          <Anchor>Sign Up</Anchor>
        </NextLink>

        <Button type="submit" fullWidth mt="md">
          Sign In
        </Button>
      </form>
    </Box>
  );
};

export default SingIn;
