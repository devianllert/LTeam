import styled from '@emotion/styled';

export const ChampionStartRoot = styled.div({
  display: 'flex',
  padding: 3,
});

export const Border = styled.div(({ theme }) => ({
  width: 1,
  height: '100%',
  background: `linear-gradient(0deg, rgba(255, 255, 255,0) 0%, ${theme.colors.radix.gray9} 50%, rgba(255, 255, 255, 0) 100%)`,
}));
