// ==============================|| CONSTANTS DASHBOARDS ||============================== //

/**
 * Valid year range to be used on date filter components
 */
const MIN_FILTER_YEAR = 2025;
const CURRENT_YEAR = new Date().getFullYear();

function* yearIterator(startYear: number, endYear: number): IterableIterator<number> {
  // Determine direction in case startYear > endYear
  const step = startYear <= endYear ? 1 : -1;
  let current = startYear;

  while (step === 1 ? current <= endYear : current >= endYear) {
    yield current;
    current += step;
  }
}

export const VALID_FILTER_YEARS = [...yearIterator(MIN_FILTER_YEAR, CURRENT_YEAR)];
