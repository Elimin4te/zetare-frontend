// project-imports
import Default from './default';
import { ThemeMode } from 'config';

// types
import { PaletteThemeProps } from 'types/theme';
import { PresetColor } from 'types/config';

// ==============================|| PRESET THEME - THEME SELECTOR ||============================== //

// We are tied to a single branded theme. `presetColor` is kept for backward compatibility with stored config.
const Theme = (_presetColor: PresetColor, mode: ThemeMode): PaletteThemeProps => {
  return Default(mode);
};

export default Theme;
