import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

import { MenuProps } from 'types/menu';

const initialState: MenuProps = {
  isDashboardDrawerOpened: false,
  isComponentDrawerOpened: true
};

export const menuStateEndpoints = {
  key: 'ui/menu',
  master: 'master'
};

export function useGetMenuMaster() {
  const { data, isLoading } = useSWR(menuStateEndpoints.key + menuStateEndpoints.master, () => initialState, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      menuMaster: data as MenuProps,
      menuMasterLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export function handlerComponentDrawer(isComponentDrawerOpened: boolean) {
  mutate(
    menuStateEndpoints.key + menuStateEndpoints.master,
    (currentMenuMaster: MenuProps | undefined) => {
      return { ...initialState, ...currentMenuMaster, isComponentDrawerOpened };
    },
    false
  );
}

export function handlerDrawerOpen(isDashboardDrawerOpened: boolean) {
  mutate(
    menuStateEndpoints.key + menuStateEndpoints.master,
    (currentMenuMaster: MenuProps | undefined) => {
      return { ...initialState, ...currentMenuMaster, isDashboardDrawerOpened };
    },
    false
  );
}
