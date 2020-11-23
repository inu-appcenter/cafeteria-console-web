import GenericRepository from '@/common/GenericRepository';
import TransactionHistory from '@/features/logs/entities/TransactionHistory';

class TransactionHistoryRepository extends GenericRepository {
    async getAllTransactionHistories() {
        const all = await this.query('GetAllTransactionHistories', 'allTransactionHistories', TransactionHistory);

        return all
            .sort((left, right) => {
                return Number.parseInt(right.timestamp) - Number.parseInt(left.timestamp);
            })
            .map((history) => {
                history.timestamp = new Date(Number.parseInt(history.timestamp)).toLocaleString()
                return history;
            });
    }
}

const transactionHistoryRepository = new TransactionHistoryRepository();

export default transactionHistoryRepository;
