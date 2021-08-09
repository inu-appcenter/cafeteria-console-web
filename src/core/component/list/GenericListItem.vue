<template>
  <v-card :loading="item.loading" :raised="item.editing" :shaped="item.editing" outlined>
    <!-- 속성들 -->
    <v-list>
      <!-- 속성 리스트 아이템 -->
      <v-list-item v-for="field in domainFields" v-show="field.visible" :key="field.name">
        <!-- 필드 이름 -->
        <v-list-item-content class="pa-0 pre-line">
          <!-- text에만 달리는 위쪽 구분선 -->
          <v-divider v-show="field.type === 'text'" class="mt-2 mb-3"></v-divider>

          <!-- 필드 이름과 설명 -->
          <v-list-item-title>{{ field.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ field.description || field.name }}</v-list-item-subtitle>

          <!-- 여기는 필드 이름이 있을 곳이지만, text의 경우는 여기에다가 필드까지 놓습니다. -->

          <!-- 텍스트 블럭 -->
          <div v-show="field.type === 'text'" class="pt-2">
            <v-textarea
              v-show="item.editing && field.mutable"
              v-model="item[field.name]"
              :rules="[field.validate]"
              class="no-vertical-space"
              hide-details
              @input="$emit('input', item)"
            />

            <div v-show="!(item.editing && field.mutable)" class="subtitle-1 pb-2">
              {{ item[field.name] }}
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
              v-show="item.editing && field.mutable"
              v-model.number="item[field.name]"
              :rules="[field.validate]"
              class="small-text-field"
              hide-detail
              type="number"
              @input="$emit('input', item)"
            />
            <span v-show="!(item.editing && field.mutable)" class="subtitle-1">{{ item[field.name] }}</span>
          </div>

          <!-- 스트링 필드 -->
          <div v-show="field.type === 'string'">
            <v-text-field
              v-show="item.editing && field.mutable"
              v-model="item[field.name]"
              :rules="[field.validate]"
              class="small-text-field"
              hide-details
              @input="$emit('input', item)"
            />
            <span v-show="!(item.editing && field.mutable)" class="subtitle-1">{{
              item[field.name] | str_limit(20)
            }}</span>
          </div>

          <!-- Boolean 필드 -->
          <div v-show="field.type === 'boolean'">
            <v-switch
              v-model="item[field.name]"
              :disabled="!(item.editing && field.mutable)"
              outlined
              @change="$emit('input', item)"
            />
          </div>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <!-- 동작들 -->
    <v-card-actions>
      <v-btn v-if="item.editing" color="red" outlined text @click="$emit('delete', item)"> 삭제 </v-btn>

      <v-spacer />

      <v-btn
        v-show="!item.editing"
        :disabled="item.loading"
        color="orange accent-4"
        outlined
        text
        @click="$emit('start-modify', item)"
      >
        수정
      </v-btn>

      <v-btn v-show="item.editing" color="orange accent-4" outlined text @click="$emit('cancel-modify', item)">
        취소
      </v-btn>
      <v-btn
        v-show="item.editing"
        :disabled="!(item.valid && item.modified)"
        color="blue"
        outlined
        text
        @click="$emit('apply', item)"
      >
        완료
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'GenericListItem',

  props: {
    item: Object,
    domainFields: Array[Object],
  },
});
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
