import { FC } from 'react';
import { Navbar as NavbarBase } from '@mantine/core';

type NavbarProps = {
  hidden: boolean;
};

export const Navbar: FC<NavbarProps> = ({ hidden }) => {
  return (
    <NavbarBase
      width={{ base: 250 }}
      p="md"
      hiddenBreakpoint="sm"
      hidden={hidden}
    >
      <NavbarBase.Section>Navbar</NavbarBase.Section>
    </NavbarBase>
  );
};
