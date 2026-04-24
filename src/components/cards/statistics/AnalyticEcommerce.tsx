// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip, { ChipProps } from '@mui/material/Chip';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { ArrowRight, ArrowUp } from 'iconsax-react';
import { useIntl } from 'react-intl';

interface Props {
  title: string;
  count: number;
  unitOfMeasure?: string;
  summarize?: boolean; // If true, formats number with compact notation (auto-detects scale)
  changePercent?: number; // Drives chip color and direction when set
  isInverted?: boolean; // If true, positive change is bad (e.g. dollar rate going up)
  percentage?: number; // Used when `changePercent` is not set
  isLoss?: boolean;
  color?: ChipProps['color'];
  extra: number;
  comparativeTimeframe?: 'year' | 'month' | 'week' | 'day' | 'projected';
  comparativeType?: 'self-start' | 'previous';
}

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

export default function AnalyticEcommerce({
  title,
  count,
  unitOfMeasure = '',
  summarize = false,
  changePercent,
  isInverted = false,
  extra,
  comparativeTimeframe,
  comparativeType,
  percentage: explicitPercent,
  isLoss: explicitIsLoss,
  color: explicitChipColor
}: Props) {
  const intl = useIntl();

  const fromChangePercent = changePercent !== undefined;

  const rawPercent = fromChangePercent ? changePercent : explicitPercent;
  const hasZeroComparisonValue = typeof rawPercent === 'number' && Math.abs(rawPercent) < 0.0000001;

  const extraValue = typeof extra === 'number' ? extra : 0;
  const hasNoVariation = fromChangePercent
    ? Math.abs(changePercent) < 0.01 && Math.abs(extraValue) < 0.01
    : (explicitPercent === 0 || explicitPercent === undefined) && Math.abs(extraValue) < 0.01;

  let isPositive: boolean;
  let isLoss: boolean;
  let color: ChipProps['color'];
  let percentage: number | undefined;
  const iconProps = hasZeroComparisonValue ? {} : hasNoVariation ? {} : { style: { transform: 'rotate(45deg)' } };

  if (fromChangePercent) {
    isPositive = changePercent >= 0;
    isLoss = isInverted ? isPositive : !isPositive;

    if (hasZeroComparisonValue) {
      color = 'secondary';
      isLoss = true;
    } else if (hasNoVariation) {
      color = 'warning';
      isLoss = false;
    } else {
      color = isInverted ? (isPositive ? 'error' : 'success') : isPositive ? 'success' : 'error';
    }
    percentage = Math.abs(changePercent);
  } else {
    isLoss = explicitIsLoss ?? false;
    color = hasZeroComparisonValue ? 'secondary' : hasNoVariation ? 'warning' : (explicitChipColor ?? 'primary');
    percentage = explicitPercent;
    isPositive = !isLoss;
    if (hasZeroComparisonValue) isLoss = true;
  }

  const isArrowUp = hasZeroComparisonValue ? false : isInverted ? isLoss : !isLoss;
  const extraIsPositive = typeof extra === 'number' ? extra >= 0 : true;

  const formatCount = (value: number): string => {
    if (summarize) {
      return value.toLocaleString(undefined, {
        notation: 'compact',
        maximumFractionDigits: 2
      });
    }
    return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <Stack spacing={0.5}>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h5" color="inherit">
              {formatCount(count)} {unitOfMeasure}
            </Typography>
          </Grid>
          {typeof percentage === 'number' && (
            <Grid item>
              <Chip
                variant="combined"
                color={color}
                icon={
                  <>
                    {isArrowUp && <ArrowUp {...iconProps} />}
                    {!isArrowUp && <ArrowRight {...iconProps} />}
                  </>
                }
                label={`${percentage.toFixed(2)}%`}
                sx={{ ml: 1.25, pl: 1, borderRadius: 1 }}
                size="small"
              />
            </Grid>
          )}
        </Grid>
      </Stack>
      <Box sx={{ pt: 2.25 }}>
        <Typography variant="caption" color="text.secondary">
          {hasZeroComparisonValue ? (
            intl.formatMessage({ id: 'sales-no-comparison-value-given' })
          ) : hasNoVariation && comparativeTimeframe && comparativeType ? (
            <>
              <Typography variant="caption" sx={{ color: `${color || 'primary'}.main` }}>
                {intl.formatMessage({ id: 'sales-no-variations' })}
              </Typography>{' '}
              vs. {intl.formatMessage({ id: `sales-vs-${comparativeType}-${comparativeTimeframe}` })}
            </>
          ) : (
            <>
              <Typography variant="caption" sx={{ color: `${color || 'primary'}.main`, fontWeight: 500 }}>
                {`${extraIsPositive ? '+' : ''}${extra.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${unitOfMeasure}`}
              </Typography>
              {comparativeTimeframe && comparativeType && (
                <> vs. {intl.formatMessage({ id: `sales-vs-${comparativeType}-${comparativeTimeframe}` })}</>
              )}
            </>
          )}
        </Typography>
      </Box>
    </MainCard>
  );
}
