<template>
  <v-list-item v-show="field.visible">
    <!-- 필드 이름 -->
    <v-list-item-content class="pa-0 pre-line">
      <!-- text에만 달리는 위쪽 구분선 -->
      <v-divider v-show="field.type === 'text'" class="mt-2 mb-3"></v-divider>

      <!-- 필드 이름과 설명 -->
      <v-list-item-title>{{ field.name }}</v-list-item-title>
      <v-list-item-subtitle>{{ field.displayName || field.name }}</v-list-item-subtitle>

      <!-- 여기는 필드 이름이 있을 곳이지만, text의 경우는 여기에다가 필드까지 놓습니다. -->

      <!-- 텍스트 블럭 -->
      <div v-show="field.type === 'text'" class="pt-2">
        <v-textarea
          v-show="editing && field.mutable"
          :value="value"
          :rules="[field.validate]"
          class="no-vertical-space"
          hide-details
          @input="update"
        />

        <div v-show="!(editing && field.mutable)" class="subtitle-1 pb-2">
          {{ value }}
        </div>
      </div>

      <!-- text에만 달리는 아래쪽 구분선 -->
      <v-divider v-show="field.type === 'text'" class="mb-1"></v-divider>
    </v-list-item-content>

    <!-- 값 -->
    <v-list-item-action v-show="field.type !== 'text'">
      <!-- 숫자 필드 -->
      <div v-show="field.type === 'int'">
        <v-text-field
          v-show="editing && field.mutable"
          :value="value"
          :rules="[field.validate]"
          class="small-text-field"
          hide-detail
          type="number"
          @input="update"
        />
        <span v-show="!(editing && field.mutable)" class="subtitle-1">{{ value }}</span>
      </div>

      <!-- 스트링 필드 -->
      <div v-show="field.type === 'string'">
        <v-text-field
          v-show="editing && field.mutable"
          :value="value"
          :rules="[field.validate]"
          class="small-text-field"
          hide-details
          @input="update"
        />
        <span v-show="!(editing && field.mutable)" class="subtitle-1">{{ value | str_limit(20) }}</span>
      </div>

      <!-- Boolean 필드 -->
      <div v-show="field.type === 'boolean'">
        <v-switch :value="value" :disabled="!(editing && field.mutable)" outlined @input="update" />
      </div>

      <!-- 날짜 필드 -->
      <div v-show="field.type === 'date'">
        <v-text-field
          v-show="editing && field.mutable"
          :value="value"
          :rules="[field.validate]"
          class="small-text-field"
          hide-details
          @input="update"
        />
        <span v-show="!(editing && field.mutable)" class="subtitle-1">{{ value | format_date }}</span>
      </div>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import EditableMixin from '@/core/component/common/mixins/EditableMixin';
import EntityFieldMixin from '@/core/component/common/mixins/EntityFieldMixin';

export default {
  mixins: [EditableMixin, EntityFieldMixin],

  name: 'EditableVListItemField',
};
</script>

<style scoped>
.small-text-field {
  max-height: 30px;
}

.no-vertical-space {
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.pre-line {
  white-space: pre-line;
}
</style>