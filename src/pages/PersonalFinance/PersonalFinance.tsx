import React, {
  ChangeEvent,
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Checkbox, TextField } from '@material-ui/core';
import './PersonalFinance.scss';

interface FinanceDataModel {
  id: number;
  creditorName: string;
  firstName: string;
  lastName: string;
  minPaymentPercentage: number;
  balance: number;
}

interface ApiResponse {
  data: FinanceDataModel[];
}

const defaultAddFormState: FinanceDataModel = {
  id: 0,
  creditorName: '',
  firstName: '',
  lastName: '',
  minPaymentPercentage: 0,
  balance: 0,
};

const PersonalFinance: FunctionComponent = () => {
  const [financeData, setFinanceData] = useState<FinanceDataModel[]>([]);
  const [addDebtFormState, setAddDebtFormState] =
    useState<FinanceDataModel>(defaultAddFormState);
  const [showAddDebtForm, setShowAddDebtForm] = useState<boolean>(false);
  const [debtTotal, setDebtTotal] = useState<number>(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [rowCountTotal, setRowCountTotal] = useState<number>(0);
  const [checkRowTotal, setCheckRowTotal] = useState<number>(0);

  useEffect(() => {
    const fetchPersonalFinance = async () => {
      const requestUrl: string =
        'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json';
      try {
        const response: ApiResponse = await axios.get(requestUrl);
        return setFinanceData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchPersonalFinance();
  }, []);

  useEffect(() => {
    setRowCountTotal(financeData.length);
  }, [financeData]);

  useEffect(() => {
    let total: number = 0;
    financeData.forEach((element: FinanceDataModel) => {
      if (selected.includes(element.id)) {
        total += element.balance;
      }
    });
    setDebtTotal(total);
    setCheckRowTotal(selected.length);
  }, [selected, financeData]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name: string = event.target.name;
    const value: string | number = event.target.value;
    setAddDebtFormState({ ...addDebtFormState, [name]: value });
  };

  const handleSubmit = () => {
    const id: number = financeData[financeData.length - 1]['id'] + 1;
    const newDebtEntry: FinanceDataModel = { ...addDebtFormState, id };
    const newData: FinanceDataModel[] = [...financeData, newDebtEntry];
    setFinanceData(newData);
    setAddDebtFormState(defaultAddFormState);
    setShowAddDebtForm(false);
  };

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
    const newFinanceDataState: FinanceDataModel[] = financeData.filter(
      (element) => {
        return !selected.includes(element.id);
      }
    );
    setFinanceData(newFinanceDataState);
  };

  const toggleAddDebtForm = () => {
    setShowAddDebtForm(!showAddDebtForm);
  };

  const { creditorName, firstName, lastName } = addDebtFormState;
  const isSubmitEnabled: boolean =
    creditorName.length > 0 && firstName.length > 0 && lastName.length > 0;

  const addDebtForm: ReactElement = (
    <div className='debtFormContainer'>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <TextField
          required
          value={creditorName}
          error={creditorName.length === 0}
          id='outlined-basic'
          label='Creditor'
          name='creditorName'
          variant='outlined'
          onChange={handleChange}
        />
        <TextField
          required
          value={firstName}
          error={firstName.length === 0}
          id='outlined-basic'
          label='First Name'
          name='firstName'
          variant='outlined'
          onChange={handleChange}
        />
        <TextField
          required
          value={addDebtFormState.lastName}
          error={lastName.length === 0}
          id='outlined-basic'
          label='Last Name'
          name='lastName'
          variant='outlined'
          onChange={handleChange}
        />
        <TextField
          required
          id='outlined-basic'
          label='Min Pay %'
          name='minPaymentPercentage'
          placeholder='0'
          variant='outlined'
          onChange={handleChange}
        />
        <TextField
          required
          id='outlined-basic'
          label='Balance'
          name='balance'
          placeholder='0'
          variant='outlined'
          onChange={handleChange}
        />
      </form>
      <Button
        variant='contained'
        onClick={handleSubmit}
        color='primary'
        disabled={!isSubmitEnabled}
      >
        Submit
      </Button>
    </div>
  );

  const rowTitles: string[] = [
    'Creditor',
    'First Name',
    'Last Name',
    'Min Pay %',
    'Balance',
  ];
  const isSelected = (id: number) => selected.includes(id);

  const table: ReactElement = (
    <TableContainer className='paper'>
      <Table className='table' aria-label='simple table'>
        <TableHead>
          <TableRow className='titleRow'>
            <TableCell padding='checkbox'>
              <Checkbox
                onChange={handleSelectAllClick}
                inputProps={{ 'aria-label': 'select all finance elements' }}
              />
            </TableCell>
            {rowTitles.map((rowTitle) => (
              <TableCell key={rowTitle}>
                <div className='boldText'>{rowTitle}</div>
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
                  role='checkbox'
                  aria-checked={isElementSelected}
                  tabIndex={-1}
                  selected={isElementSelected}
                >
                  <TableCell padding='checkbox'>
                    <Checkbox
                      checked={isElementSelected}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </TableCell>
                  <TableCell component='th' scope='row'>
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
      <Button
        id='addDebtButton'
        variant='contained'
        onClick={toggleAddDebtForm}
        color='primary'
      >
        {showAddDebtForm ? 'Cancel' : 'Add Debt'}
      </Button>
      <Button
        variant='contained'
        onClick={() => handleRemoveDebt()}
        color='primary'
      >
        Remove Debt
      </Button>
    </TableContainer>
  );

  return (
    <div className='container'>
      <h1>Personal Finance Debt Calculator</h1>
      {table}
      {showAddDebtForm && addDebtForm}
      <div className='totalDebtContainer'>
        <p className='total'>Total:</p>
        <p className='debt'>
          ${debtTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      </div>
      <div className='rowCountContainer'>
        <p className='totalRowCount'>Total Row Count: {rowCountTotal}</p>
        <p>Check Row Count: {checkRowTotal}</p>
      </div>
    </div>
  );
};

export default PersonalFinance;
