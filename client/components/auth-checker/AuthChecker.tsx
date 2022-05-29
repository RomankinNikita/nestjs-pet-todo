import React, { useEffect } from 'react'
import { useUserContext } from '../../contexts/user';
import { NextApi } from '../../utils/axios';
import { NEXT_API_PATHS } from '../../utils/constants';
import { UserMapped } from '../../utils/types';

export const AuthChecker = () => {
  const [user, setUser] = useUserContext();

  useEffect(() => {
    async function check(): Promise<void> {
      try {
        const { data } = await NextApi.get<UserMapped>(NEXT_API_PATHS.check);
      if (data) {
        setUser(data);
      }
      } catch (_) {
        setUser(null)
      }
    }

    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null
}
