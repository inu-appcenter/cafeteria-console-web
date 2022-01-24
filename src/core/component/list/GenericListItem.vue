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
  <v-card :loading="item.loading" :raised="item.editing" :shaped="item.editing" outlined>
    <v-list>
      <EditableVListItemField
        v-for="field in domainFields"
        v-model="item[field.name]"
        :key="field.name"
        :field="field"
        :editing="item.editing"
        @input="$emit('input', item)"
      />
    </v-list>

    <v-card-actions>
      <v-btn v-if="item.editing" color="red" outlined text @click="$emit('start-delete', item)"> 삭제 </v-btn>

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
