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
  <v-list-item v-show="field.visible" :class="dense ? 'small-list-item' : ''">
    <!-- 필드 이름 -->
    <v-list-item-content class="pa-0 pre-line">
      <!-- text에만 달리는 위쪽 구분선 -->
      <v-divider v-show="field.type === 'text'" class="mt-2 mb-3"></v-divider>

      <!-- 필드 이름과 설명 -->
      <v-list-item-title v-show="!dense">{{ field.name }}</v-list-item-title>
      <v-list-item-subtitle>{{ field.displayName || field.name }}</v-list-item-subtitle>

      <!-- 여기는 필드 이름이 있을 곳이지만, text의 경우는 여기에다가 필드까지 놓습니다. -->

      <!-- 텍스트 블럭 -->
      <div v-show="field.type === 'text'" class="pt-2">
        <div class="subtitle-1 pb-2">
          {{ value }}
        </div>
      </div>

      <!-- text에만 달리는 아래쪽 구분선 -->
      <v-divider v-show="field.type === 'text'" class="mb-1"></v-divider>
    </v-list-item-content>

    <!-- 값 -->
    <v-list-item-action :class="dense ? 'ma-0' : ''" v-show="field.type !== 'text'">
      <!-- 숫자 필드 -->
      <div v-show="field.type === 'int'">
        <span class="subtitle-1">{{ value }}</span>
      </div>

      <!-- 스트링 필드 -->
      <div v-show="field.type === 'string'">
        <span class="subtitle-1">{{ value | str_limit(32) }}</span>
      </div>

      <!-- Boolean 필드 -->
      <div v-show="field.type === 'boolean'">
        <v-switch :value="value" :disabled="true" outlined />
      </div>

      <!-- 날짜 필드 -->
      <div v-show="field.type === 'date'">
        <span class="subtitle-1">{{ value | format_date }}</span>
      </div>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import ValueMixin from '@/core/component/common/mixins/ValueMixin';
import EntityFieldMixin from '@/core/component/common/mixins/EntityFieldMixin';

export default {
  mixins: [ValueMixin, EntityFieldMixin],

  props: {
    dense: Boolean,
  },

  name: 'ReadOnlyVListItemField',
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
