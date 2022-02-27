<!--
  - This file is part of INU Cafeteria.
  -
  - Copyright 2022 INU Global App Center <potados99@gmail.com>
  -
  - INU Cafeteria is free software: you can redistribute it and/or modify
  - it under the terms of the GNU General Public License as published by
  - the Free Software Foundation, either version 3 of the License, or
  - (at your option) any later version.
  -
  - INU Cafeteria is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU General Public License for more details.
  -
  - You should have received a copy of the GNU General Public License
  - along with this program.  If not, see <https://www.gnu.org/licenses/>.
  -->

<template>
  <v-row justify="center">
    <v-col cols="12" lg="12" md="8" sm="10" xs="12">
      <div>
        <div class="row mx-2 mt-3 mb-1">
          <h2>{{ itemDisplayName }}</h2>
        </div>

        <LoadingStatusView
          :error="error"
          :loading="fetching"
          skeleton-type="list-item-two-line, list-item-three-line, list-item-two-line, actions"
        />
        <EmptyView item-display-name="질문이 없습니다." :all-items="allItems" :fetching="fetching" :error="error" />

        <v-layout class="pl-6 pr-6 pt-0 pb-0 mt-3 mb-1" row>
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
