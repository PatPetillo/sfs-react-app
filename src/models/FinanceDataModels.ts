interface FinanceDataModel {
  id: number;
  creditorName: string;
  firstName: string;
  lastName: string;
  minPaymentPercentage: number;
  balance: number;
}

interface FinanceDataApiResponse {
  data: FinanceDataModel[];
}

export type { FinanceDataModel, FinanceDataApiResponse };
