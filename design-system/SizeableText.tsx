import { getFontSized } from '@tamagui/get-font-sized';
import { GetProps, styled, Text } from '@tamagui/web';

export const SizableText = styled(Text, {
  name: 'SizableText',
  fontFamily: '$body',

  variants: {
    size: getFontSized,
  } as const,

  defaultVariants: {
    size: '$true',
  },
})

export type SizableTextProps = GetProps<typeof SizableText>