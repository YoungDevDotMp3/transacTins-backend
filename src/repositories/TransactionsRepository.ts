import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreatTransactionsDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(trans => trans.type === 'income')
      .reduce((a: number, b: Transaction) => a + b.value, 0);
    const outcome = this.transactions
      .filter(trans => trans.type === 'outcome')
      .reduce((a: number, b: Transaction) => a + b.value, 0);
    const total = income - outcome;
    const balance = { income, outcome, total };
    return balance;
  }

  public create({ title, value, type }: CreatTransactionsDTO): Transaction {
    const trans = new Transaction({ title, value, type });
    this.transactions.push(trans);
    return trans;
  }
}

export default TransactionsRepository;
