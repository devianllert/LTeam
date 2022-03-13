import styled from '@emotion/styled';

export const ChampionBannerRoot = styled.div(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.colors.background.secondary,
}));

export interface ChampionImgProps {
  imgPath: string;
}

export const ChampionImg = styled.div<ChampionImgProps>(({ theme, ...props }) => ({
  display: 'flex',
  width: '40%',
  marginLeft: 'auto',
  height: '100%',
  backgroundImage: `url(${props.imgPath})`,
  backgroundSize: 'cover',
  backgroundPosition: '50% 20%',
  position: 'relative',
  '&::before': {
    content: '""',
    width: '100px',
    background: `linear-gradient(to right, ${theme.colors.background.secondary} 33%, rgba(0, 0, 0, 0))`,
    position: 'absolute',
    height: '100%',
    left: 0,
  },
  '&::after': {
    marginLeft: 'auto',
    content: '""',
    width: '100px',
    background: `linear-gradient(to left, ${theme.colors.background.secondary} 33%, rgba(0, 0, 0, 0))`,
    height: '100%',
    position: 'absolute',
    right: 0,
  },
}));
