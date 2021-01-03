import GenericRepository from '@/common/GenericRepository';
import Log from '@/features/logs/entities/Log';

class LogRepository extends GenericRepository {
    async getRecentLogs() {
        const all = await this.query('GetRecentLogs', 'recentLogs', Log);

        return all
            .sort((left, right) => {
                return Number.parseInt(right.timestamp) - Number.parseInt(left.timestamp);
            })
            .map((log) => {
                log.timestamp = new Date(Number.parseInt(log.timestamp)).toLocaleString()
                return log;
            })
    }
}

const logRepository = new LogRepository();

export default logRepository;
