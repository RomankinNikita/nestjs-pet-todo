import type { NextPage } from 'next';
import { Layout } from '../components/layout/Layout';

const Home: NextPage = () => {
  return (
    <>
      <Layout title="Home Page">
        <p>Hello World</p>
      </Layout>
    </>
  );
};

export default Home;
