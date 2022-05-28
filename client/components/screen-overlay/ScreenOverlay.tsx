import { LoadingOverlay } from '@mantine/core';
import React, { FC } from 'react';

type ScreenOverlayProps = {
  visible: boolean;
};
export const ScreenOverlay: FC<ScreenOverlayProps> = ({ visible }) => {
  return (
    <LoadingOverlay
      visible={visible}
      sx={{ position: 'fixed', left: 0, top: 0, right: 0, bottom: 0 }}
    />
  );
};
