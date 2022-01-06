import * as React from 'react';

import * as S from './styled';

export interface MainFooterProps {
  /**
   * The content
   */
  children?: React.ReactNode;
}

export const MainFooter = (props: MainFooterProps): JSX.Element => {
  const {
    children,
  } = props;

  return (
    <S.MainFooterRoot>{children}</S.MainFooterRoot>
  );
};
