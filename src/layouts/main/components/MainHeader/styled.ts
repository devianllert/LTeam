import styled from '@emotion/styled';

export const MainHeaderRoot = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: 64,
});

export const MainHeaderContainer = styled.header((props) => ({
  zIndex: 1,
  backgroundColor: props.theme.colors.background.secondary,
}));

export const MainHeaderNavigation = styled.nav({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  height: '100%',
});

export const MainHeaderNavigationList = styled.ul({
  padding: 0,
  margin: 0,
  display: 'flex',
  justifyContent: 'center',
  height: '100%',
});

export const MainHeaderNavigationListItem = styled.li({
  display: 'flex',
});

export const MainHeaderLink = styled.a<{ active?: boolean }>((props) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  fontSize: 16,
  paddingLeft: 24,
  paddingRight: 24,
  textDecoration: 'none',
  color: props.active ? props.theme.colors.text.primary : props.theme.colors.text.secondary,

  ...(props.active && {
    background: `linear-gradient(to bottom, transparent 25%, ${props.theme.colors.radix.grayA4} 100%, transparent 0%)`,

    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      backgroundColor: props.theme.colors.radix.primary8,
      width: '100%',
      height: 4,
    },
  }),
}));
