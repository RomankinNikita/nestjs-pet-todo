import { FC } from 'react';
import { Navbar as NavbarBase, List, ThemeIcon } from '@mantine/core';
import { useRoutes } from '../../hooks/useRoutes';
import Link from 'next/link';

type NavbarProps = {
  hidden: boolean;
};

export const Navbar: FC<NavbarProps> = ({ hidden }) => {
  const routes = useRoutes();

  return (
    <NavbarBase
      width={{ base: 250 }}
      p="md"
      hiddenBreakpoint="sm"
      hidden={hidden}
    >
      <NavbarBase.Section>
        <List spacing="md" size="md">
          {routes.map(({ id, href, label, icon: Icon }) => (
            <List.Item
              key={id}
              icon={
                Icon && (
                  <ThemeIcon size={24} radius="xl">
                    <Icon />
                  </ThemeIcon>
                )
              }
            >
              <Link href={href}>
                <a>{label}</a>
              </Link>
            </List.Item>
          ))}
        </List>
      </NavbarBase.Section>
    </NavbarBase>
  );
};
