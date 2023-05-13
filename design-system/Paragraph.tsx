import { SizableText } from '@/design-system/SizeableText';
import { GetProps, styled } from '@tamagui/web';

export const Paragraph = styled(SizableText, {
  name: 'Paragraph',
  tag: 'p',
  userSelect: 'auto',
  color: '$color',
  size: '$true',
})

export type ParagraphProps = GetProps<typeof Paragraph>
