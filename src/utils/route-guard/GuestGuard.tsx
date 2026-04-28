import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project-imports
import useAuth from 'hooks/useAuth';
import { useDefaultPath } from 'hooks/useDefaultPath';

// types
import { GuardProps } from 'types/auth';

// ==============================|| GUEST GUARD ||============================== //

export default function GuestGuard({ children }: GuardProps) {
  const { isLoggedIn } = useAuth();
  const defaultPath = useDefaultPath();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      const target = (location.state as any)?.from ? (location.state as any).from : defaultPath;
      // Avoid infinite loops when a guard navigates to the same location repeatedly.
      if (typeof target === 'string' && target === location.pathname) {
        return;
      }
      navigate(target, {
        state: { from: '' },
        replace: true
      });
    }
    // We only depend on stable pieces of location to avoid re-running on object identity changes.
  }, [isLoggedIn, defaultPath, navigate, location.pathname, (location.state as any)?.from]);

  return children;
}
