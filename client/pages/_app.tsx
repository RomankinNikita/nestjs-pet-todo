import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { UserContextProvider, useUserContext } from '../contexts/user';
import '../styles/globals.scss';
import { useEffect } from 'react';
import { NEXT_API_PATHS } from '../utils/constants';
import { NextApi } from '../utils/axios';
import { UserMapped } from '../utils/types';
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
        <UserContextProvider>
          <AuthChecker />
          <Component {...pageProps} />
        </UserContextProvider>
      </MantineProvider>
    </>
  );
}
