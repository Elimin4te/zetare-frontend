import React from 'react';
import { ArrowUp, ArrowRight } from 'iconsax-react';
import { ChipProps } from '@mui/material/Chip';

export interface ChangeIndicatorResult {
  isPositive: boolean;
  isLoss: boolean;
  color: ChipProps['color'];
  isArrowUp: boolean;
  icon: React.ReactElement;
}

export interface GetChangeIndicatorOptions {
  /**
   * When set: if not a finite value &gt; 0, treat like AnalyticEcommerce with no comparison baseline
   * (neutral `secondary` chip, ArrowRight — e.g. projected $ missing).
   */
  comparisonBaseline?: number;
}

/**
 * Calculates change indicator properties (color, arrow direction, etc.) based on percentage change
 * @param changePercent - The percentage change (can be positive or negative)
 * @param isInverted - If true, positive change is considered bad (e.g., dollar rate going up)
 * @returns Object with indicator properties
 */
export function getChangeIndicator(
  changePercent: number,
  isInverted: boolean = false,
  options?: GetChangeIndicatorOptions
): ChangeIndicatorResult {
  const baseline = options?.comparisonBaseline;
  const hasNoComparisonBaseline = baseline !== undefined && !(Number.isFinite(baseline) && baseline > 0);

  if (hasNoComparisonBaseline) {
    return {
      isPositive: true,
      isLoss: true,
      color: 'secondary',
      isArrowUp: false,
      icon: React.createElement(ArrowRight, {})
    };
  }

  const isPositive = changePercent >= 0;
  const isLoss = isInverted ? isPositive : !isPositive;

  // Special case: no variation (very close to 0)
  const hasNoVariation = Math.abs(changePercent) < 0.01;
  let color: ChipProps['color'];
  if (hasNoVariation) {
    color = 'warning';
  } else {
    color = isInverted ? (isPositive ? 'error' : 'success') : isPositive ? 'success' : 'error';
  }

  // Arrow logic:
  // Normal: positive = good = arrow up = !isLoss
  // Inverted: negative = good = arrow up = isLoss (because negative change is good)
  const isArrowUp = isInverted ? isLoss : !isLoss;

  const iconProps = hasNoVariation ? {} : { style: { transform: 'rotate(45deg)' } };
  const icon = isArrowUp ? React.createElement(ArrowUp, iconProps) : React.createElement(ArrowRight, iconProps);

  return {
    isPositive,
    isLoss,
    color,
    isArrowUp,
    icon
  };
}
