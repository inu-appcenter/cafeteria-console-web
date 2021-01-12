<template>
  <GenericList v-bind="commentProps"/>
</template>

<script>
import GenericList from '@/common/GenericList';
import Comment from '@/features/cafeteria/entities/Comment';
import commentRepository from '@/features/cafeteria/data/CommentRepository';

export default {
  name: 'CommentList',
  components: {GenericList},

  data() {
    return {
      commentProps: {
        keyName: 'cafeteria_id',
        itemName: 'cafeteria_comment',
        itemDisplayName: '카페테리아 Comment',
        domainFields: Comment.fields(),

        itemGenerator: () => {
          return new Comment({});
        },
        formValidator: (comment, allComments) => {
          return !allComments.find((c) => c.cafeteria_id === comment.cafeteria_id); // should not exist.
        },

        onFetch: async () => commentRepository.getAllComments(),
        onAdd: async (item) => commentRepository.addComment(item),
        onUpdate: async (item) => commentRepository.updateComment(item),
        onDelete: async (item) => commentRepository.deleteComment(item)
      }
    };
  }
}
</script>

<style scoped>

</style>
