import styled from '@emotion/styled';

export const Ul = styled.ul({
  listStyle: 'none',
  padding: 0,
  width: '100%',
  gap: 4,
});

export const Li = styled.li((props) => ({
  backgroundColor: props.theme.colors.radix.gray3,
  width: '100%',
}));
