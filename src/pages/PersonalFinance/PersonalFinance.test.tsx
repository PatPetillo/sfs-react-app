import React from 'react';
import { render } from '@testing-library/react';
import PersonalFinance from './PersonalFinance';
import '@testing-library/jest-dom/extend-expect';

describe('the Personal Finance page', () => {
  test('should render the page', () => {
    const personalFinancePage = render(<PersonalFinance />);
    expect(personalFinancePage).toBeTruthy();
  });
});
