import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import { SnackbarProps } from 'types/snackbar';

export const snackbarEndpoints = { key: 'snackbar' };

const initialState: SnackbarProps = {
  action: false,
  open: false,
  message: 'Note archived',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right'
  },
  variant: 'default',
  alert: {
    color: 'primary',
    variant: 'filled'
  },
  transition: 'Fade',
  close: false,
  actionButton: false,
  maxStack: 3,
  dense: false,
  iconVariant: 'usedefault'
};

export function useGetSnackbar() {
  const { data } = useSWR(snackbarEndpoints.key, () => initialState, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(() => ({ snackbar: data! }), [data]);

  return memoizedValue;
}

export function openSnackbar(snackbar: SnackbarProps) {
  const { action, open, message, anchorOrigin, variant, alert, transition, close, actionButton } = snackbar;

  mutate(
    snackbarEndpoints.key,
    (currentSnackbar: SnackbarProps | undefined) => {
      const b = { ...initialState, ...currentSnackbar };
      return {
        ...b,
        action: action || b.action,
        open: open || b.open,
        message: message || b.message,
        anchorOrigin: anchorOrigin || b.anchorOrigin,
        variant: variant || b.variant,
        alert: {
          color: alert?.color || b.alert.color,
          variant: alert?.variant || b.alert.variant
        },
        transition: transition || b.transition,
        close: close || b.close,
        actionButton: actionButton || b.actionButton
      };
    },
    false
  );
}

export function closeSnackbar() {
  mutate(
    snackbarEndpoints.key,
    (currentSnackbar: SnackbarProps | undefined) => {
      return { ...initialState, ...currentSnackbar, open: false };
    },
    false
  );
}

export function handlerIncrease(maxStack: number) {
  mutate(
    snackbarEndpoints.key,
    (currentSnackbar: SnackbarProps | undefined) => {
      return { ...initialState, ...currentSnackbar, maxStack };
    },
    false
  );
}

export function handlerDense(dense: boolean) {
  mutate(
    snackbarEndpoints.key,
    (currentSnackbar: SnackbarProps | undefined) => {
      return { ...initialState, ...currentSnackbar, dense };
    },
    false
  );
}

export function handlerIconVariants(iconVariant: string) {
  mutate(
    snackbarEndpoints.key,
    (currentSnackbar: SnackbarProps | undefined) => {
      return { ...initialState, ...currentSnackbar, iconVariant };
    },
    false
  );
}
