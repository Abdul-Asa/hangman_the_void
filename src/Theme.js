import { extendTheme } from '@chakra-ui/react';

// 2. Add your color mode config
const colors = {
  brand: {
    1: '#7928CA',
    2: '#FF0080',
    3: '#171717',
    4: '#E8E8E8',
  },
  gray: {
    800: '#171717',
  },
  white: '#E8E8E8',
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};
// 3. extend the theme
const theme = extendTheme({ colors, config });

export default theme;
