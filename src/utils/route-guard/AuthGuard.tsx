import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project-imports
import useAuth from 'hooks/useAuth';

// types
import { GuardProps } from 'types/auth';

// ==============================|| AUTH GUARD ||============================== //

export default function AuthGuard({ children }: GuardProps) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      // Avoid loops if we’re already at the login screen.
      if (location.pathname === '/login') {
        return;
      }
      navigate('/login', {
        state: {
          from: location.pathname
        },
        replace: true
      });
    }
  }, [isLoggedIn, navigate, location.pathname]);

  return children;
}
