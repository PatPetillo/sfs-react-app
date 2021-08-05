import { Button, TextField } from '@material-ui/core';
import React, { ChangeEvent, ReactElement, useState } from 'react';
import { FinanceDataModel } from '../../models/FinanceDataModels';
import styles from './AddDebtForm.module.scss';

interface AddDebtFormProps {
  financeData: FinanceDataModel[];
  handleSetFinanceData: React.Dispatch<React.SetStateAction<FinanceDataModel[]>>;
  handleSetShowAddDebtForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultAddFormState: FinanceDataModel = {
  id: 0,
  creditorName: '',
  firstName: '',
  lastName: '',
  minPaymentPercentage: 0,
  balance: 0,
};

const AddDebtForm = ({
  financeData,
  handleSetFinanceData,
  handleSetShowAddDebtForm,
}: AddDebtFormProps): ReactElement => {
  const [addDebtFormState, setAddDebtFormState] = useState<FinanceDataModel>(defaultAddFormState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name: string = event.target.name;
    let value: string | number = event.target.value;
    if (name === 'minPaymentPercentage' || name === 'balance') {
      value = +value;
    }
    setAddDebtFormState({ ...addDebtFormState, [name]: value });
  };

  const handleSubmit = () => {
    const id: number = financeData.length ? financeData[financeData.length - 1]['id'] + 1 : 1;
    const newDebtEntry: FinanceDataModel = { ...addDebtFormState, id };
    const newData: FinanceDataModel[] = [...financeData, newDebtEntry];
    handleSetFinanceData(newData);
    setAddDebtFormState(defaultAddFormState);
    handleSetShowAddDebtForm(false);
  };

  const { creditorName, firstName, lastName } = addDebtFormState;
  const isSubmitEnabled: boolean = creditorName.length > 0 && firstName.length > 0 && lastName.length > 0;

  return (
    <div className={styles.debtFormContainer}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <TextField
          required
          value={creditorName}
          error={creditorName.length === 0}
          id="outlined-basic"
          label="Creditor"
          name="creditorName"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          required
          value={firstName}
          error={firstName.length === 0}
          id="outlined-basic"
          label="First Name"
          name="firstName"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          required
          value={addDebtFormState.lastName}
          error={lastName.length === 0}
          id="outlined-basic"
          label="Last Name"
          name="lastName"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Min Pay %"
          name="minPaymentPercentage"
          placeholder="0"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Balance"
          name="balance"
          placeholder="0"
          variant="outlined"
          onChange={handleChange}
        />
      </form>
      <Button variant="contained" onClick={handleSubmit} color="primary" disabled={!isSubmitEnabled}>
        Submit
      </Button>
    </div>
  );
};

export default AddDebtForm;
