import React, { ReactElement } from 'react';
import styles from './TotalDebt.module.scss';

interface TotalDebtProps {
  debtTotal: number;
  rowCountTotal: number;
  checkRowTotal: number;
}

const TotalDebt = ({ debtTotal, rowCountTotal, checkRowTotal }: TotalDebtProps): ReactElement => {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.total}>Total:</p>
        <p className={styles.debt}>${debtTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
      </div>
      <div className={styles.rowCountContainer}>
        <p className={styles.totalRowCount}>Total Row Count: {rowCountTotal}</p>
        <p>Checked Row Count: {checkRowTotal}</p>
      </div>
    </>
  );
};

export default TotalDebt;
