import { FC, MouseEventHandler } from 'react';
import {
  Burger,
  Header as HeaderBase,
  MediaQuery,
  useMantineTheme,
  Text,
  Group,
} from '@mantine/core';

type HeaderProps = {
  opened: boolean;
  onBurgerClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Header: FC<HeaderProps> = ({ opened, onBurgerClick }) => {
  const theme = useMantineTheme();

  return (
    <HeaderBase height={70} p="md">
      <Group align={'center'} sx={{ height: '100%' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={onBurgerClick}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        <Text>Application header</Text>
      </Group>
    </HeaderBase>
  );
};
