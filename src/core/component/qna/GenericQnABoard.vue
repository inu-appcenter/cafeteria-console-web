<template>
  <v-row justify="center">
    <v-col cols="12" lg="12" md="8" sm="10" xs="12">
      <div>
        <div class="row mx-2 my-1">
          <h2>{{ itemDisplayName }}</h2>
        </div>

        <LoadingStatusView
          :error="error"
          :loading="fetching"
          skeleton-type="list-item-two-line, list-item-three-line, list-item-two-line, actions"
        />
        <EmptyView item-display-name="질문이 없습니다." :all-items="allItems" :fetching="fetching" :error="error" />

        <v-layout class="pl-6 pr-6 pt-0 pb-0" row>
          <v-row v-masonry item-selector=".item" transition-duration="0.3s">
            <v-col
              v-for="question in allItems"
              :key="question[keyName]"
              v-masonry-tile
              class="item pa-2"
              cols="12"
              lg="4"
              md="6"
              sm="6"
              xs="12"
            >
              <GenericQnABoardItem v-bind="valueMapper(question)" @write-answer="onClickWriteAnswer" />
            </v-col>
          </v-row>
        </v-layout>

        <GenericQnABoardNewItemDialog
          :answer-fields="answerMeta.fields"
          :answer-now-editing="answerNowEditing"
          :edit-answer-dialog-visible="editAnswerDialogVisible"
          :edit-dialog-title="editAnswerDialogTitle"
          @apply="onClickDoneWriteAnswer"
          @cancel-edit="onClickCancelWriteAnswer"
          @form-update="onModifyAnswer"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import LoadingStatusView from '@/components/LoadingStatusView';
import GenericQnABoardMixin from '@/core/component/qna/mixins/GenericQnABoardMixin';
import EmptyView from '@/core/component/common/EmptyView';
import GenericQnABoardItem from '@/core/component/qna/GenericQnABoardItem';
import GenericQnABoardNewItemDialog from '@/core/component/qna/GenericQnABoardNewItemDialog';

export default {
  mixins: [GenericQnABoardMixin],

  name: 'GenericQnABoard',
  components: {
    EmptyView,
    LoadingStatusView,
    GenericQnABoardItem,
    GenericQnABoardNewItemDialog,
  },

  mounted() {
    this.load();
  },
};
</script>
