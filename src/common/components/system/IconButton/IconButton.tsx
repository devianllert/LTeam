/* eslint-disable prefer-arrow-callback */
import * as React from 'react';

import { OverridableComponent } from '@/modules/core/react/types/OverridableComponent';

import { ButtonBaseProps } from '@/components/system/ButtonBase';
import { VisuallyHidden } from '@/components/system/VisuallyHidden';

import * as S from './styled';

export interface IconButtonProps extends ButtonBaseProps {
  children: React.ReactNode;
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   *
   * @default false
   */
  edge?: 'end' | 'start' | false;
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   *
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   *
   * @default 'primary'
   */
  color?: string;
  /**
   * The accessible label for the icon. This label will be visually hidden but announced to screen
   * reader users, similar to `alt` text for `img` tags.
   */
  label?: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface IconButtonTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & IconButtonProps;
  defaultComponent: D;
}

export const IconButton: OverridableComponent<IconButtonTypeMap> = React.forwardRef(function IconButton(props, ref) {
  const {
    children,
    edge = false,
    size = 'medium',
    color = 'primary',
    label,
    ...other
  } = props;

  return (
    <S.IconButtonRoot edge={edge} size={size} color={color} {...other} ref={ref}>
      {React.cloneElement(children as React.ReactElement, {
        'aria-hidden': true,
        focusable: false,
      })}
      {label && <VisuallyHidden>{label}</VisuallyHidden>}
    </S.IconButtonRoot>
  );
});
