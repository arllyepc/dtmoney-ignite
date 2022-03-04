import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react';
import { api } from '../services/api';

const TransactionsContext = createContext<TransactionsContextData>(
	{} as TransactionsContextData //Gambiarra para o TypeScript aceitar
);

interface Transaction {
	id: number;
	title: string;
	amount: number;
	category: string;
	type: string;
	createdAt: string;
}

interface TransactionsProviderProps {
	children: ReactNode;
}

// interface TransactionInput {
// 	title: string;
// 	amount: number;
// 	category: string;
// 	type: string;
// }

// type TransactionInput = Omit<Transaction, "id" | "createdAt">

interface TransactionsContextData {
	transactions: Transaction[];
	createTransaction: (transaction: TransactionInput) => Promise<void>; //void, pois a funçãop createTransaction não tem retorno
}

type TransactionInput = Pick<
	Transaction,
	'title' | 'amount' | 'type' | 'category'
>;

export function TransactionsProvider({ children }: TransactionsProviderProps) {
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	const data = useContext(TransactionsContext);

	useEffect(() => {
		api
			.get('transactions')

			.then((response) => setTransactions(response.data.transactions));
	}, []);

	async function createTransaction(transactionInput: TransactionInput) {
		const response = await api.post('/transactions', { 
			...transactionInput,
			createdAt: new Date(),
		});
		const { transaction } = response.data;
		setTransactions([...transactions, transaction]);
	}

	return (
		<TransactionsContext.Provider
			value={{
				transactions,
				createTransaction,
			}}>
			{children}
		</TransactionsContext.Provider>
	);
}

export function useTransactions() {
	const context = useContext(TransactionsContext);

	return context;
}
