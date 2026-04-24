import Chip, { ChipProps } from '@mui/material/Chip';
import { getChangeIndicator } from 'utils/getChangeIndicator';

export interface SalesChangePercentChipProps {
  change: number;
  isInverted?: boolean;
  /** When provided and not a positive finite value, shows neutral ArrowRight (no valid comparison baseline). */
  comparisonBaseline?: number;
  decimalPlaces?: number;
  size?: ChipProps['size'];
  sx?: ChipProps['sx'];
}

/**
 * Reusable % change chip aligned with AnalyticEcommerce / channel tables: neutral gray + right arrow when baseline is missing.
 */
export default function SalesChangePercentChip({
  change,
  isInverted = false,
  comparisonBaseline,
  decimalPlaces = 1,
  size = 'small',
  sx
}: SalesChangePercentChipProps) {
  const indicator = getChangeIndicator(change, isInverted, { comparisonBaseline });

  return (
    <Chip
      icon={indicator.icon}
      label={`${change >= 0 ? '+' : ''}${change.toFixed(decimalPlaces)}%`}
      size={size}
      variant="combined"
      color={indicator.color}
      sx={{ fontWeight: 600, ...sx }}
    />
  );
}
