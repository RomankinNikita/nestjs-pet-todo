import { ReactNode, FC } from 'react';
import { AppShell } from '@mantine/core';
import { Navbar } from '../navbar/Navbar';
import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
import Head from 'next/head';
import { useToggle } from '@mantine/hooks';

type Props = {
  children?: ReactNode;
  title?: string;
};

export const Layout: FC<Props> = (props) => {
  const { children, title } = props;
  const [opened, toggleOpened] = useToggle(false, [false, true]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <AppShell
        navbar={<Navbar hidden={!opened} />}
        footer={<Footer />}
        header={<Header onBurgerClick={() => toggleOpened()} opened={opened} />}
      >
        {children}
      </AppShell>
    </>
  );
};
