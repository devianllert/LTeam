import styled from '@emotion/styled';
import { createScrollbarStyles } from '@/common/design/tokens/scrollbar';

export const ScrollbarArea = styled.div((props) => ({
  ...createScrollbarStyles({
    thumbColor: props.theme.colors.radix.gray10,
    trackColor: 'tranparent',
    width: 12,
    border: 4,
  }),
}));
