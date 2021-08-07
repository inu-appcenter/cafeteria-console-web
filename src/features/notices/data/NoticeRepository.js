import GenericRepository from '@/common/GenericRepository';
import Notice from '@/features/notices/entities/Notice';

class NoticeRepository extends GenericRepository {
  async getAllNotices() {
    return this.query('GetAllNotices', 'allNotices', Notice);
  }

  async addNotice(notice) {
    return this.mutate('AddNotice', 'createNotice', [
      {
        name: 'notice',
        type: 'NoticeInput',
        value: notice.filter(Notice.fields().map(f => f.name)),
      },
    ]);
  }

  async updateNotice(notice) {
    return this.mutate('UpdateNotice', 'updateNotice', [
      {
        name: 'notice',
        type: 'NoticeInput',
        value: notice.filter(Notice.fields().map(f => f.name)),
      },
    ]);
  }

  async deleteNotice(notice) {
    return this.mutate('DeleteNotice', 'deleteNotice', [
      {
        name: 'noticeId',
        type: 'Int',
        value: notice.id,
      },
    ]);
  }
}

const noticeRepository = new NoticeRepository();

export default noticeRepository;
