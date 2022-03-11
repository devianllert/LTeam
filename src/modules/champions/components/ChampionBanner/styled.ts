import styled from '@emotion/styled';

export const ChampionBannerRoot = styled.div({
  width: '100%',
});

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
  '&::before': {
    content: '""',
    width: '100px',
    background: `linear-gradient(to right, ${theme.colors.background.secondary}, rgba(0, 0, 0, 0))`,
  },
}));
