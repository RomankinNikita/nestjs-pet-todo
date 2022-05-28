import { FC, MouseEventHandler } from 'react';
import {
  Burger,
  Header as HeaderBase,
  MediaQuery,
  useMantineTheme,
  Group,
  Avatar,
  Box,
  Button,
} from '@mantine/core';
import { User } from '../user/User';

type HeaderProps = {
  opened: boolean;
  onBurgerClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Header: FC<HeaderProps> = ({ opened, onBurgerClick }) => {
  const theme = useMantineTheme();

  return (
    <HeaderBase height={70} p="md">
      <Group align="center" position="apart" sx={{ height: '100%' }}>
        <Group spacing="xs">
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              opened={opened}
              onClick={onBurgerClick}
              size="sm"
              color={theme.colors.gray[6]}
            />
          </MediaQuery>

          <Avatar color="cyan" radius="xl">
            Pet
          </Avatar>
        </Group>

        <User />
      </Group>
    </HeaderBase>
  );
};
