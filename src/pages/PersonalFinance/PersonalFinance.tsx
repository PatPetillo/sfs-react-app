import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PersonalFinance.module.scss';
import { FinanceDataApiResponse, FinanceDataModel } from '../../models/FinanceDataModels';
import AddDebtForm from '../../components/AddDebtForm/AddDebtForm';
import TotalDebt from '../../components/TotalDebt/TotalDebt';
import PersonalFinanceTable from '../../components/PersonalFinanceTable/PersonalFinanceTable';

const PersonalFinance: FunctionComponent = (): ReactElement => {
  const [financeData, setFinanceData] = useState<FinanceDataModel[]>([]);
  const [showAddDebtForm, setShowAddDebtForm] = useState<boolean>(false);
  const [debtTotal, setDebtTotal] = useState<number>(0);
  const [rowCountTotal, setRowCountTotal] = useState<number>(0);
  const [checkRowTotal, setCheckRowTotal] = useState<number>(0);

  useEffect(() => {
    const fetchPersonalFinance = async () => {
      const requestUrl = 'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json';
      try {
        const response: FinanceDataApiResponse = await axios.get(requestUrl);
        return setFinanceData(response.data);
      } catch (error) {
        console.error(error.response);
      }
    };
    fetchPersonalFinance();
  }, []);

  useEffect(() => {
    setRowCountTotal(financeData.length);
  }, [financeData]);

  const handleSetFinanceData = (financeDataValue: React.SetStateAction<FinanceDataModel[]>) =>
    setFinanceData(financeDataValue);
  const handleSetShowAddDebtForm = (showAddDebtValue: React.SetStateAction<boolean>) =>
    setShowAddDebtForm(showAddDebtValue);
  const handleSetDebtTotal = (debtTotalValue: React.SetStateAction<number>) => setDebtTotal(debtTotalValue);
  const handleSetCheckedRowTotal = (checkedRowTotalValue: React.SetStateAction<number>) =>
    setCheckRowTotal(checkedRowTotalValue);
  const handleToggleAddDebtForm = () => setShowAddDebtForm((previousValue) => !previousValue);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Personal Finance Debt Calculator</h1>
      <PersonalFinanceTable
        financeData={financeData}
        showAddDebtForm={showAddDebtForm}
        handleSetFinanceData={handleSetFinanceData}
        handleSetDebtTotal={handleSetDebtTotal}
        handleSetCheckedRowTotal={handleSetCheckedRowTotal}
        handleToggleAddDebtForm={handleToggleAddDebtForm}
      />
      {showAddDebtForm && (
        <AddDebtForm
          financeData={financeData}
          handleSetFinanceData={handleSetFinanceData}
          handleSetShowAddDebtForm={handleSetShowAddDebtForm}
        />
      )}
      <TotalDebt debtTotal={debtTotal} rowCountTotal={rowCountTotal} checkRowTotal={checkRowTotal} />
    </div>
  );
};

export default PersonalFinance;
