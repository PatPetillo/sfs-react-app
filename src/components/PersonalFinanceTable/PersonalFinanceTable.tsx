import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Checkbox } from '@material-ui/core';
import { FinanceDataModel } from '../../models/FinanceDataModels';
import styles from './PersonalFinanceTable.module.scss';

interface PersonalFinanceDataTableProps {
  financeData: FinanceDataModel[];
  showAddDebtForm: boolean;
  handleSetFinanceData: React.Dispatch<React.SetStateAction<FinanceDataModel[]>>;
  handleSetDebtTotal: React.Dispatch<React.SetStateAction<number>>;
  handleSetCheckedRowTotal: React.Dispatch<React.SetStateAction<number>>;
  handleToggleAddDebtForm: React.Dispatch<React.SetStateAction<null>>;
}

const PersonalFinanceTable = ({
  financeData,
  showAddDebtForm,
  handleSetFinanceData,
  handleSetDebtTotal,
  handleSetCheckedRowTotal,
  handleToggleAddDebtForm,
}: PersonalFinanceDataTableProps): ReactElement => {
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    let total = 0;
    financeData.forEach((element: FinanceDataModel) => {
      if (selected.includes(element.id)) {
        total += element.balance;
      }
    });
    handleSetDebtTotal(total);
    handleSetCheckedRowTotal(selected.length);
  }, [selected, financeData, handleSetDebtTotal, handleSetCheckedRowTotal]);

  const handleCheckBoxClick = (id: number) => {
    const isSelected: boolean = selected.includes(id);
    let newSelected: number[] = [];

    if (!isSelected) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter((elementId) => elementId !== id);
    }

    setSelected(newSelected);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newlySelected: number[] = financeData.map((element) => element.id);
      setSelected(newlySelected);
      return;
    }
    setSelected([]);
  };

  const handleRemoveDebt = () => {
    const newFinanceDataState: FinanceDataModel[] = financeData.filter((element) => {
      return !selected.includes(element.id);
    });
    handleSetFinanceData(newFinanceDataState);
    setSelected([]);
  };

  const rowTitles: string[] = ['Creditor', 'First Name', 'Last Name', 'Min Pay %', 'Balance'];
  const isSelected = (id: number) => selected.includes(id);
  const toggleAddDebtForm = () => handleToggleAddDebtForm(null);

  return (
    <TableContainer className="paper">
      <Table className={styles.table} aria-label="simple table">
        <TableHead>
          <TableRow className={styles.titleRow}>
            <TableCell padding="checkbox">
              <Checkbox onChange={handleSelectAllClick} inputProps={{ 'aria-label': 'select all finance elements' }} />
            </TableCell>
            {rowTitles.map((rowTitle) => (
              <TableCell key={rowTitle}>
                <b>{rowTitle}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {financeData.length > 0 && (
          <TableBody>
            {financeData.map((element: FinanceDataModel, index) => {
              const isElementSelected: boolean = isSelected(element.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  key={element.id}
                  hover
                  onClick={() => handleCheckBoxClick(element.id)}
                  role="checkbox"
                  aria-checked={isElementSelected}
                  tabIndex={-1}
                  selected={isElementSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isElementSelected} inputProps={{ 'aria-labelledby': labelId }} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {element.creditorName}
                  </TableCell>
                  <TableCell>{element.firstName}</TableCell>
                  <TableCell>{element.lastName}</TableCell>
                  <TableCell>{element.minPaymentPercentage}%</TableCell>
                  <TableCell>${element.balance}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
      <div className={styles.buttonContainer}>
        <Button id={styles.addDebtButton} variant="contained" onClick={toggleAddDebtForm} color="primary">
          {showAddDebtForm ? 'Cancel' : 'Add Debt'}
        </Button>
        <Button variant="contained" onClick={() => handleRemoveDebt()} color="primary">
          Remove Debt
        </Button>
      </div>
    </TableContainer>
  );
};

export default PersonalFinanceTable;
