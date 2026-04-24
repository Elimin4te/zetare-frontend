import React, { CSSProperties, forwardRef } from 'react';
import { useIntl } from 'react-intl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import type { SxProps, Theme } from '@mui/material/styles';

interface FilterAutocompleteProps<T> {
  options: T[];
  getOptionLabel: (option: T) => string;
  value: T | T[] | null;
  onChange: (event: any, newValue: T | T[] | null) => void;
  onInputChange?: (event: any, inputValue: string) => void;
  loading?: boolean;
  filterOptions?: (options: T[], state?: { inputValue: string; getOptionLabel: (option: T) => string }) => T[];
  isOptionEqualToValue: (option: T, value: T) => boolean;
  label: string;
  placeholder?: string;
  placeHolderSx?: SxProps<Theme>;
  getChipLabel?: (option: T) => string;
  allSelectedMessageId?: string;
  maxChips?: number;
  chipStyle?: SxProps<Theme>;
  variant?: 'outlined' | 'filled' | 'standard';
  multiple?: boolean;
  listBoxProps?: {
    style?: CSSProperties;
  };
  totalOptionsCount?: number;
  filteredOptionsCount?: number;
}

// Custom ListboxComponent with footer message
const ListboxWithFooter = forwardRef<
  HTMLUListElement,
  { children?: React.ReactNode; totalOptionsCount?: number; filteredOptionsCount?: number; style?: CSSProperties; [key: string]: any }
>(({ children, totalOptionsCount, filteredOptionsCount, style, ...other }, ref) => {
  const intl = useIntl();
  const showMoreMessage = totalOptionsCount !== undefined && filteredOptionsCount !== undefined && totalOptionsCount > filteredOptionsCount;

  return (
    <Box>
      <Box
        component="ul"
        ref={ref}
        {...other}
        sx={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
          ...(style && { ...style })
        }}
      >
        {children}
      </Box>
      {showMoreMessage && (
        <>
          <Divider sx={{ mt: 0, mb: 1 }} />
          <Box sx={{ px: 2, pb: 1 }}>
            <Typography color="text.secondary" sx={{ fontSize: '0.65rem' }}>
              {intl.formatMessage({ id: 'and-more-filter' }, { count: totalOptionsCount - filteredOptionsCount })}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
});

ListboxWithFooter.displayName = 'ListboxWithFooter';

export default function FilterAutocomplete<T>({
  options,
  getOptionLabel,
  value,
  onChange,
  onInputChange,
  loading = false,
  filterOptions,
  isOptionEqualToValue,
  label,
  placeholder,
  placeHolderSx,
  getChipLabel,
  allSelectedMessageId,
  maxChips = 3,
  chipStyle,
  variant = 'outlined',
  multiple = true,
  listBoxProps,
  totalOptionsCount,
  filteredOptionsCount
}: FilterAutocompleteProps<T>) {
  const intl = useIntl();

  const isValueEmpty = multiple ? ((value as T[]) || []).length === 0 : value === null;

  // Wrap onInputChange to prevent clearing search when selecting an option
  const handleInputChange = (event: any, inputValue: string, reason: string) => {
    // Only call onInputChange when user is typing, not when selecting/resetting
    if (reason === 'input' && onInputChange) {
      onInputChange(event, inputValue);
    }
  };

  const defaultListboxProps: { style?: CSSProperties } = {
    style: {
      maxHeight: 400,
      fontSize: '0.5rem',
      marginBottom: '-5px'
    }
  };

  const defaultPlaceHolderSx: SxProps<Theme> = {
    '& .MuiInputLabel-root': {
      fontSize: '0.75rem'
    },
    '& .MuiInputLabel-shrink': {
      fontSize: '0.8rem'
    },
    '& .MuiInputBase-input::placeholder': {
      fontSize: '0.75rem'
    },
    '& .MuiInputBase-input[value]': {
      fontSize: '0.75rem',
      opacity: 0.9
    }
  };

  return (
    <Autocomplete
      multiple={multiple}
      options={options}
      getOptionLabel={getOptionLabel}
      value={value}
      onChange={onChange}
      onInputChange={handleInputChange}
      loading={loading}
      filterOptions={filterOptions || ((options, _state) => options)}
      isOptionEqualToValue={isOptionEqualToValue}
      disableCloseOnSelect={multiple}
      renderTags={
        multiple && getChipLabel
          ? (tagValue, getTagProps) => {
              const visibleChips = tagValue.slice(0, maxChips);
              const remainingCount = tagValue.length - maxChips;

              return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0, alignItems: 'center' }}>
                  {tagValue.length === 0 ? (
                    allSelectedMessageId ? (
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                        {intl.formatMessage({ id: allSelectedMessageId })}
                      </Typography>
                    ) : null
                  ) : (
                    <>
                      {visibleChips.map((option, index) => {
                        const { key, ...tagProps } = getTagProps({ index });
                        return (
                          <Chip
                            key={key}
                            label={getChipLabel(option)}
                            {...tagProps}
                            size="small"
                            sx={{
                              bgcolor: 'primary.lighter',
                              border: '1px solid',
                              borderColor: 'primary.light',
                              '& .MuiSvgIcon-root': {
                                color: 'primary.main',
                                '&:hover': {
                                  color: 'primary.dark'
                                }
                              },
                              fontSize: '0.75em',
                              ...chipStyle
                            }}
                          />
                        );
                      })}
                      {remainingCount > 0 && (
                        <Typography variant="subtitle1" fontWeight={100} sx={{ ml: 0.5, color: 'text.secondary' }}>
                          {intl.formatMessage({ id: 'more' }, { count: remainingCount })}
                        </Typography>
                      )}
                    </>
                  )}
                </Box>
              );
            }
          : undefined
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant={variant}
          size="medium"
          label={label}
          placeholder={isValueEmpty ? placeholder || label : ''}
          sx={{
            ...(placeHolderSx ?? defaultPlaceHolderSx)
          }}
        />
      )}
      ListboxProps={listBoxProps ?? defaultListboxProps}
      ListboxComponent={
        totalOptionsCount !== undefined && filteredOptionsCount !== undefined
          ? (props: any) => (
              <ListboxWithFooter {...props} totalOptionsCount={totalOptionsCount} filteredOptionsCount={filteredOptionsCount} />
            )
          : undefined
      }
    />
  );
}
