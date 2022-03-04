import Modal from 'react-modal';
import { api } from '../../services/api';
import { Container, TransactionTypeContainer, Radiobox } from './styles';
import closeImg from '../../assets/close.svg';
import imgIncome from '../../assets/income.svg';
import imgOutcome from '../../assets/outcome.svg';
import { FormEvent, useState, useContext } from 'react';
import { TransactionsContext } from '../../TransactionsContext';

interface NewTransactionModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

export function NewTransactionModal({
	isOpen,
	onRequestClose,
}: NewTransactionModalProps) {
	const { createTransaction } = useContext(TransactionsContext);
	const [title, setTitle] = useState('');
	const [amount, setAmount] = useState(0);
	const [category, setCategory] = useState('');
	const [type, setType] = useState('deposit');

	async function handleCreateNewTransaction(event: FormEvent) {
		event.preventDefault();

		await createTransaction({
			title,
			amount,
			category,
			type,
		});
		setTitle('');
		setAmount(0);
		setCategory('');
		setType('deposit');
		onRequestClose();
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			overlayClassName='react-modal-overlay'
			className='react-modal-content'>
			<button type='button'>
				<img
					src={closeImg}
					onClick={onRequestClose}
					className='react-modal-close'
					alt='Fechar modal'
				/>
			</button>
			<Container onSubmit={handleCreateNewTransaction}>
				<h2>Cadastrar Transação</h2>
				<input
					placeholder='Título'
					value={title}
					onChange={(event) => setTitle(event.target.value)}
				/>

				<input
					type='number'
					placeholder='Valor'
					value={amount}
					onChange={(event) => setAmount(Number(event.target.value))}
				/>

				<TransactionTypeContainer>
					<Radiobox
						type='button'
						onClick={() => {
							setType('deposit');
						}}
						isActive={type === 'deposit'}
						activeColor='green'>
						<img src={imgIncome} alt='Entrada' />
						<span>Entrada</span>
					</Radiobox>

					<Radiobox
						type='button'
						onClick={() => {
							setType('withdraw');
						}}
						isActive={type === 'withdraw'}
						activeColor='red'>
						<img src={imgOutcome} alt='Saída' />
						<span>Saída</span>
					</Radiobox>
				</TransactionTypeContainer>

				<input
					placeholder='Categoria'
					value={category}
					onChange={(event) => setCategory(event.target.value)}
				/>

				<button type='submit'>Cadastrar</button>
			</Container>
		</Modal>
	);
}
