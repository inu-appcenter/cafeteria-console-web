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
  <v-card :loading="question.loading" :raised="question.editing" :shaped="question.editing" outlined>
    <!-- 헤더 -->
    <div class="row ma-0">
      <!-- 질문 상태 -->
      <v-card-title v-show="!answer" class="body-1 orange--text">답변 대기중</v-card-title>
      <v-card-title v-show="answer && !answerRead" class="body-1 light-blue--text">답변됨</v-card-title>
      <v-card-title v-show="answer && answerRead" class="body-1 green--text"> 답변 전달됨 </v-card-title>

      <!-- 간격 -->
      <v-spacer />

      <!-- 날짜 -->
      <v-card-title v-show="!answer" class="text--secondary body-2">
        {{ askedAt | format_time_diff }} 경과
      </v-card-title>
      <v-card-title v-show="answer && !answerRead" class="text--secondary body-2">
        {{ answeredAt | format_date }}
      </v-card-title>
      <v-card-title v-show="answer && answerRead" class="text--secondary body-2">
        {{ answerReadAt | format_date }}
      </v-card-title>
    </div>

    <!-- 구분선 -->
    <v-divider></v-divider>

    <v-list>
      <!-- 작성자 -->
      <v-list-item class="small-list-item">
        <v-list-item-content>
          <v-list-item-subtitle>작성자</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>{{ askedBy }}</v-list-item-action>
      </v-list-item>

      <!-- 시각 -->
      <v-list-item class="small-list-item">
        <v-list-item-content>
          <v-list-item-subtitle>문의 시각</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>{{ askedAt | format_date }}</v-list-item-action>
      </v-list-item>

      <!-- 기타 필드들 -->
      <ReadOnlyVListItemField
        v-for="field in questionFields"
        v-model="question[field.name]"
        :key="field.name"
        :field="field"
        dense
      />

      <!-- 구분선 -->
      <v-divider class="mt-2 mb-1"></v-divider>

      <!-- 내용 -->
      <v-list-item>
        <v-list-item-content class="pb-0 pre-line">
          <v-list-item-subtitle class="pb-3">문의 내용</v-list-item-subtitle>
          {{ questionBody }}
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <!-- 동작 -->
    <v-card-actions>
      <v-spacer />

      <v-btn v-show="!answer" color="orange accent-4" block @click="$emit('write-answer', question, answer)">
        답변하기
      </v-btn>
      <v-btn v-show="answer" color="light-blue accent-4" outlined text @click="$emit('write-answer', question, answer)">
        답변 수정하기
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ReadOnlyVListItemField from '@/core/component/common/ReadOnlyVListItemField';

export default {
  name: 'GenericQnABoardItem',
  components: {ReadOnlyVListItemField},
  props: {
    question: Object,
    questionFields: Array[Object],
    questionBody: String,
    askedAt: Date,
    askedBy: String,
    answer: Object,
    answeredAt: Date,
    answerRead: Boolean,
    answerReadAt: Date,
  },
};
</script>

<style scoped>
.small-list-item {
  min-height: 30px;
  height: 30px;
}

.pre-line {
  white-space: pre-line;
}
</style>
