import styled from '@emotion/styled';

export const CardRoot = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '16px',
  border: '1px solid',
  borderColor: theme.colors.radix.gray6,
}));

export const Content = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 3,
});
