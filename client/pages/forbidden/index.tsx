import { Group, Text } from '@mantine/core';
import type { NextPage } from 'next';
import { Layout } from '../../components/layout/Layout';

const Forbidden: NextPage = () => {
  return (
    <Group position="center" align="center" sx={{height: '100vh', width: '100vw'}}>
      <Text size="xl">Access Forbidden</Text>
    </Group>
  );
};

export default Forbidden;
