import {
  amber,
  amberDark,
  blue,
  blueDark,
  bronze,
  bronzeDark,
  brown,
  brownDark,
  crimson,
  crimsonDark,
  cyan,
  cyanDark,
  gold,
  goldDark,
  grass,
  grassDark,
  gray,
  grayDark,
  green,
  greenDark,
  indigo,
  indigoDark,
  iris,
  irisDark,
  jade,
  jadeDark,
  lime,
  limeDark,
  mint,
  mintDark,
  orange,
  orangeDark,
  pink,
  pinkDark,
  plum,
  plumDark,
  purple,
  purpleDark,
  red,
  redDark,
  ruby,
  rubyDark,
  sky,
  skyDark,
  teal,
  tealDark,
  tomato,
  tomatoDark,
  violet,
  violetDark,
  yellow,
  yellowDark,
  mauve,
  mauveDark,
  slate,
  slateDark,
  sage,
  sageDark,
  olive,
  oliveDark,
  sand,
  sandDark,
} from "@radix-ui/colors";

export const graysLight = {
  gray,
  mauve,
  slate,
  sage,
  olive,
  sand
}

export const graysDark = {
  gray,
  mauve: mauveDark,
  slate: slateDark,
  sage: sageDark,
  olive: oliveDark,
  sand: sandDark,
}

export const light = {
  gray,
  gold,
  bronze,
  brown,
  yellow,
  amber,
  orange,
  tomato,
  red,
  ruby,
  crimson,
  pink,
  plum,
  purple,
  violet,
  iris,
  indigo,
  blue,
  cyan,
  teal,
  jade,
  green,
  grass,
  lime,
  mint,
  sky,
};

export const dark = {
  gray: grayDark,
  gold: goldDark,
  bronze: bronzeDark,
  brown: brownDark,
  yellow: yellowDark,
  amber: amberDark,
  orange: orangeDark,
  tomato: tomatoDark,
  red: redDark,
  ruby: rubyDark,
  crimson: crimsonDark,
  pink: pinkDark,
  plum: plumDark,
  purple: purpleDark,
  violet: violetDark,
  iris: irisDark,
  indigo: indigoDark,
  blue: blueDark,
  cyan: cyanDark,
  teal: tealDark,
  jade: jadeDark,
  green: greenDark,
  grass: grassDark,
  lime: limeDark,
  mint: mintDark,
  sky: skyDark,
};

const grays = {light: graysLight, dark: graysDark}

const colors = { light, dark, grays };

export default colors;
