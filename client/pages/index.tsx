import { Text } from '@mantine/core';
import type { NextPage } from 'next';
import { Layout } from '../components/layout/Layout';

const Home: NextPage = () => {
  return (
    <>
      <Layout title="Home Page">
        <Text>
          This is the Home Page of my Pet project that uses NextJs and NestJs
          under the hood
        </Text>
      </Layout>
    </>
  );
};

export default Home;
