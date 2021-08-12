<template>
  <v-card :loading="item.loading" :raised="item.editing" :shaped="item.editing" outlined>
    <v-list>
      <EditableVListItemField
        v-for="field in domainFields"
        v-model="item[field.name]"
        :key="field.name"
        :field="field"
        :editing="item.editing"
      >
      </EditableVListItemField>
    </v-list>

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
import EditableVListItemField from '@/core/component/common/EditableVListItemField';

export default Vue.extend({
  name: 'GenericListItem',

  components: {EditableVListItemField},

  props: {
    item: Object,
    domainFields: Array[Object],
  },
});
</script>
