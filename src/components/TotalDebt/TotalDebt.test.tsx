import { cleanup, render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import TotalDebt from './TotalDebt';

afterEach(cleanup);

describe('TotalDebt Component', () => {
  const totalRowCountText = 'Total Row Count:';
  const checkedRowCountText = 'Checked Row Count:';
  const rowCountTotal = 10;
  const checkedRowTotal = 0;
  const debtTotal = 8293;

  const getDebtTotalString = (total: number) => `$${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

  test('should render the TotalDebt component', () => {
    const personalFinancePage = render(
      <TotalDebt debtTotal={debtTotal} rowCountTotal={rowCountTotal} checkRowTotal={checkedRowTotal} />
    );
    expect(personalFinancePage).toBeTruthy();
  });

  test('should display the total debt, total row count, and checked row count with inital props', () => {
    render(<TotalDebt debtTotal={debtTotal} rowCountTotal={rowCountTotal} checkRowTotal={checkedRowTotal} />);
    expect(screen.getByText(`${totalRowCountText} ${rowCountTotal}`)).toBeInTheDocument();
    expect(screen.getByText(`${checkedRowCountText} ${checkedRowTotal}`)).toBeInTheDocument();
    expect(screen.getByText(getDebtTotalString(debtTotal))).toBeInTheDocument();
  });

  test('should update the total debt, total row count, and checked row cont when props change', () => {
    const { rerender } = render(
      <TotalDebt debtTotal={debtTotal} rowCountTotal={rowCountTotal} checkRowTotal={checkedRowTotal} />
    );
    expect(screen.getByText(`${totalRowCountText} ${rowCountTotal}`)).toBeInTheDocument();
    expect(screen.getByText(`${checkedRowCountText} ${checkedRowTotal}`)).toBeInTheDocument();
    expect(screen.getByText(getDebtTotalString(debtTotal))).toBeInTheDocument();

    const newRowCountTotal = 15;
    const newCheckedRowTotal = 3;
    const newDebtTotal = 12795;
    rerender(
      <TotalDebt debtTotal={newDebtTotal} rowCountTotal={newRowCountTotal} checkRowTotal={newCheckedRowTotal} />
    );
    expect(screen.getByText(`${totalRowCountText} ${newRowCountTotal}`)).toBeInTheDocument();
    expect(screen.getByText(`${checkedRowCountText} ${newCheckedRowTotal}`)).toBeInTheDocument();
    expect(screen.getByText(getDebtTotalString(newDebtTotal))).toBeInTheDocument();
  });
});
