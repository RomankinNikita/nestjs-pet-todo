import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { UserContextProvider, useUserContext } from '../contexts/user';
import '../styles/globals.scss';
import { NotificationsProvider } from '@mantine/notifications';
import { AuthChecker } from '../components/auth-checker/AuthChecker';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Pet todo</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
        }}
      >
        <NotificationsProvider>
          <UserContextProvider>
            <AuthChecker />
            <Component {...pageProps} />
          </UserContextProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
