import React from 'react';
import { render } from '@testing-library/react';
import PersonalFinance from './PersonalFinance';
import '@testing-library/jest-dom/extend-expect';

describe('the personal finance page', () => {
  it('should render the page', () => {
    const personalFinancePage = render(<PersonalFinance />);
    expect(personalFinancePage).toBeTruthy();
  });
});
