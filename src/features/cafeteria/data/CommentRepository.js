import GenericRepository from '@/common/GenericRepository';
import Comment from '@/features/cafeteria/entities/Comment';

class CommentRepository extends GenericRepository {

    async getAllComments() {
        return this.query('GetAllCafeteriaComments', 'allCafeteriaComments', Comment);
    }

    async addComment(comment) {
        return this.mutate('AddCafeteriaComment', 'createCafeteriaComment', [
            {
                name: 'comment',
                type: 'CafeteriaCommentInput',
                value: comment.filter(Comment.fields().map((f) => f.name))
            }
        ]);
    }

    async updateComment(comment) {
        return this.mutate('UpdateCafeteriaComment', 'updateCafeteriaComment', [
            {
                name: 'comment',
                type: 'CafeteriaCommentInput',
                value: comment.filter(Comment.fields().map((f) => f.name))
            }
        ]);
    }

    async deleteComment(comment) {
        return this.mutate('DeleteCafeteriaComment', 'deleteCafeteriaComment', [
            {
                name: 'cafeteriaId',
                type: 'Int',
                value: comment.cafeteria_id
            }
        ]);
    }
}

const commentRepository = new CommentRepository();

export default commentRepository;
