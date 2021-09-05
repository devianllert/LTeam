import * as React from 'react';

import * as S from './styled';

export interface DividerProps {
  /**
   * Either `vertical` or `horizontal`.
   *
   * @default 'horizontal'
   */
  orientation?: 'vertical' | 'horizontal';
  /**
   * Whether or not the component is purely decorative. When true, accessibility-related attributes
   * are updated so that that the rendered element is removed from the accessibility tree.
   *
   * @default false
   */
  decorative?: boolean;
  /**
   * The divider space.
   *
   * @default 2
   */
  space?: number;
  /**
   * If `true`, a vertical divider will have the correct height when used in flex container.
   * (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
   *
   * @default false
   */
  flexItem?: boolean;
}

const DEFAULT_ORIENTATION = 'horizontal';

export const Divider = (props: DividerProps): JSX.Element => {
  const {
    orientation = DEFAULT_ORIENTATION,
    space = 2,
    decorative,
    flexItem = false,
  } = props;

  // `aria-orientation` defaults to `horizontal` so we only need it if `orientation` is vertical
  const ariaOrientation = orientation === 'vertical' ? orientation : undefined;
  const semanticProps = decorative
    ? { role: 'none' }
    : { 'aria-orientation': ariaOrientation, role: 'separator' };

  return (
    <S.DividerRoot flexItem={flexItem} orientation={orientation} space={space} {...semanticProps} />
  );
};
