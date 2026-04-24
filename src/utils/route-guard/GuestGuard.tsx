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
      navigate(location?.state?.from ? location?.state?.from : defaultPath, {
        state: { from: '' },
        replace: true
      });
    }
  }, [isLoggedIn, defaultPath, navigate, location]);

  return children;
}
