import { Box, Button, Avatar, Group, Text, Menu } from '@mantine/core';
import Link from 'next/link';
import React, { useState } from 'react';
import { useUserContext } from '../../contexts/user';
import { APP_PATHS, NEXT_API_PATHS } from '../../utils/constants';
import { Logout } from 'tabler-icons-react';
import { NextApi } from '../../utils/axios';
import { handleClientError } from '../../utils/handleError';
import { ScreenOverlay } from '../screen-overlay/ScreenOverlay';
import { useRouter } from 'next/router';

export const User = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [user, setUser] = useUserContext();
  const isSignedIn = !!user;

  const handleSignOut = async (): Promise<void> => {
    try {
      setLoading(true);
      await NextApi.get(NEXT_API_PATHS.signOut);
    } catch (e: unknown) {
      handleClientError(e, 'SignOut Error');
    } finally {
      setLoading(false);
      setUser(null);
      router.push(APP_PATHS.main);
    }
  };

  return (
    <Box>
      {!isSignedIn && (
        <Link href={APP_PATHS.signIn} passHref>
          <Button component="a">Sign In</Button>
        </Link>
      )}

      {isSignedIn && (
        <Menu
          control={
            <Group align="center" spacing="xs" sx={{ cursor: 'pointer' }}>
              <Avatar radius="xl" />
              <Text>{user?.email}</Text>
            </Group>
          }
        >
          <Menu.Item
            icon={<Logout size={14} />}
            onClick={handleSignOut}
            disabled={loading}
          >
            Sign Out
          </Menu.Item>
        </Menu>
      )}

      <ScreenOverlay visible={loading} />
    </Box>
  );
};
