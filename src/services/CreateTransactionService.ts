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

  public execute({title, value, type}:Request): Transaction {

    if( !(type == "income" || type == "outcome") ){
      throw Error("Type unknown");
    }

    const balance = this.transactionsRepository.getBalance();

    if(type == "outcome" && value > balance.total){
      throw Error("without enough balance");
    }

    const transaction = this.transactionsRepository.create({value, title, type});

    return transaction;
  }
}

export default CreateTransactionService;
