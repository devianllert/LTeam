import * as React from 'react';

import * as S from './styled';

export interface ChampionAbilitiesProps {
  /**
   * The content
   */
  children: React.ReactNode;
}

export const ChampionAbilities = (props: ChampionAbilitiesProps): JSX.Element => {
  const {
    children,
  } = props;

  return (
    <S.ChampionAbilitiesRoot>{children}</S.ChampionAbilitiesRoot>
  );
};
