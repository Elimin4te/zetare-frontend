import type { ComponentType } from 'react';
import { memo, useMemo } from 'react';

import Box from '@mui/material/Box';

import * as Iconsax from 'iconsax-react';

type Props = {
  name?: string | null;
  size?: number;
  color?: string;
  variant?: any;
  /** Accessibility label when rendered as an icon-only element */
  'aria-label'?: string;
};

function IconByNameBase({ name, size = 24, color, variant = 'Bulk', 'aria-label': ariaLabel }: Props) {
  const Icon = useMemo(() => {
    if (!name) return null;
    const c = (Iconsax as unknown as Record<string, ComponentType<any>>)[name];
    return c ?? null;
  }, [name]);

  if (!Icon) {
    const Fallback = (Iconsax as unknown as Record<string, ComponentType<any>>).InfoCircle;
    return Fallback ? <Fallback size={size} color={color} variant={variant} aria-label={ariaLabel} /> : <Box component="span" />;
  }

  return <Icon size={size} color={color} variant={variant} aria-label={ariaLabel} />;
}

const IconByName = memo(IconByNameBase);
export default IconByName;

