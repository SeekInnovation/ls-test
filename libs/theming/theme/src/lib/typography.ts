import { pxToRem, responsiveFontSizes } from '../utils/formatFontSize';
// ----------------------------------------------------------------------

const FONT_PRIMARY = "'Rubik', sans-serif"; // Google Font
// const FONT_SECONDARY = 'CircularStd, sans-serif'; // Local Font

const Typography = {
  fontFamily: FONT_PRIMARY,

  fontWeightRegular: 500,
  fontWeightMedium: 600,
  fontWeightBold: 700,

  h1: {
    fontWeight: 400,
    lineHeight: 80 / 64,
    fontSize: pxToRem(30),
    ...responsiveFontSizes({ sm: 24, md: 26, lg: 28 }),
  },
  h2: {
    fontWeight: 400,
    lineHeight: 64 / 48,
    fontSize: pxToRem(28),
    ...responsiveFontSizes({ sm: 22, md: 24, lg: 26 }),
  },
  h3: {
    lineHeight: 1.5,
    fontWeight: 400,
    fontSize: pxToRem(26),
    ...responsiveFontSizes({ sm: 20, md: 22, lg: 24 }),
  },
  h4: {
    lineHeight: 1.5,
    fontWeight: 400,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 18, md: 20, lg: 22 }),
  },
  h5: {
    lineHeight: 1.5,
    fontWeight: 400,
    fontSize: pxToRem(22),
    ...responsiveFontSizes({ sm: 16, md: 18, lg: 20 }),
  },
  h6: {
    fontWeight: 400,
    lineHeight: 28 / 18,
    fontSize: pxToRem(21),
    ...responsiveFontSizes({ sm: 15, md: 17, lg: 19 }),
  },
  subtitle1: {
    fontSize: pxToRem(17),
    lineHeight: 1.5,
    fontWeight: 400,
    ...responsiveFontSizes({ sm: 14, md: 15, lg: 16 }),
  },
  subtitle2: {
    fontSize: pxToRem(15),
    lineHeight: 22 / 14,
    fontWeight: 400,
    ...responsiveFontSizes({ sm: 12, md: 13, lg: 14 }),
  },
  body1: {
    fontSize: pxToRem(18),
    lineHeight: 1.5,
    ...responsiveFontSizes({ sm: 15, md: 16, lg: 17 }),
  },
  body2: {
    fontSize: pxToRem(17),
    lineHeight: 22 / 14,
    ...responsiveFontSizes({ sm: 14, md: 15, lg: 16 }),
  },
  caption: {
    fontSize: pxToRem(12),
    lineHeight: 1.5,
  },
  overline: {
    fontSize: pxToRem(12),
    lineHeight: 1.5,
    fontWeight: 700,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 600,
    lineHeight: 24 / 14,
    fontSize: pxToRem(17),
    textTransform: 'capitalize',
    ...responsiveFontSizes({ sm: 14, md: 15, lg: 16 }),
  },
};

export default Typography;
