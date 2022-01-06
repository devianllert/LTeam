import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MainFooter } from '../MainFooter';

describe('<MainFooter />', () => {
  const children = 'MainFooter';

  it('should render a children', () => {
    render(<MainFooter>{children}</MainFooter>);

    expect(screen.getByText(children)).toBeDefined();
  });
});