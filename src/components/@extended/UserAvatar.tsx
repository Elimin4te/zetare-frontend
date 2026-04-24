import { useMemo } from 'react';

// material-ui
import { SxProps, Theme } from '@mui/material/styles';

// project-imports
import Avatar from 'components/@extended/Avatar';
import useAuth from 'hooks/useAuth';
import { getUserInitials } from 'utils/getUserInitials';

// types
import { UserProfile } from 'types/auth';

interface UserAvatarProps {
  user?: UserProfile | null;
  size?: number | { width?: number; height?: number };
  sx?: SxProps<Theme>;
  alt?: string;
}

// ==============================|| USER AVATAR ||============================== //

export default function UserAvatar({ user, size, sx, alt }: UserAvatarProps) {
  const { user: authUser } = useAuth();
  const currentUser = user || authUser;

  // Get user initials for default avatar
  const initials = useMemo(
    () => getUserInitials(currentUser?.firstName, currentUser?.lastName),
    [currentUser?.firstName, currentUser?.lastName]
  );
  const hasAvatar = !!currentUser?.avatar;
  const hasInitials = !!initials;

  // Get display name for alt text
  const displayName =
    alt ||
    currentUser?.displayName ||
    (currentUser?.firstName && currentUser?.lastName ? `${currentUser.firstName} ${currentUser.lastName}` : null) ||
    currentUser?.username ||
    'User';

  // Handle size prop
  const sizeStyles = useMemo(() => {
    if (!size) return {};
    if (typeof size === 'number') {
      return { width: size, height: size };
    }
    return {
      ...(size.width && { width: size.width }),
      ...(size.height && { height: size.height })
    };
  }, [size]);

  // Render avatar with initials or image
  if (hasAvatar) {
    return <Avatar alt={displayName} src={currentUser.avatar} sx={{ ...sizeStyles, ...sx }} />;
  }

  if (hasInitials) {
    return (
      <Avatar
        alt={displayName}
        sx={{
          ...sizeStyles,
          backgroundColor: '#F3A206',
          color: '#fff',
          fontWeight: 400,
          fontSize: '0.9rem',
          ...sx
        }}
      >
        {initials}
      </Avatar>
    );
  }

  return <Avatar alt={displayName} sx={{ ...sizeStyles, ...sx }} />;
}
