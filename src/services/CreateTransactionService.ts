import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();
    if (type === 'outcome') {
      if (balance.total - value < 0) {
        throw Error('Não extrapola viado');
      }
    }
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Tem de ser income ou outcome vei!');
    }
    const trans = this.transactionsRepository.create({ title, value, type });
    return trans;
  }
}

export default CreateTransactionService;
