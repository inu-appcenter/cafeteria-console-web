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
  <div v-show="field.visible && field.mutable">
    <!-- 숫자 필드 -->
    <v-text-field
      v-show="field.type === 'int'"
      :value="value"
      :label="label"
      :rules="[field.validate]"
      outlined
      type="number"
      @input="update(Number($event))"
    />

    <!-- 스트링 필드 -->
    <v-text-field
      v-show="field.type === 'string'"
      :value="value"
      :label="label"
      :rules="[field.validate]"
      outlined
      @input="update"
    />

    <!-- 텍스트 필드 -->
    <v-textarea
      v-show="field.type === 'text'"
      :value="value"
      :label="label"
      :rules="[field.validate]"
      outlined
      @input="update"
    />

    <!-- 날짜 필드 -->
    <v-datetime-picker
      v-if="field.type === 'date'"
      :value="value"
      :label="label"
      :rules="[field.validate]"
      outlined
      @input="update"
    />

    <!-- Boolean 필드 -->
    <v-switch
      v-show="field.type === 'boolean'"
      :input-value="value"
      :label="label"
      :rules="[field.validate]"
      @change="update"
    />
  </div>
</template>

<script>
import EditableMixin from '@/core/component/common/mixins/EditableMixin';
import EntityFieldMixin from '@/core/component/common/mixins/EntityFieldMixin';

export default {
  mixins: [EditableMixin, EntityFieldMixin],

  name: 'FormInputField',

  data() {
    return {
      label: this.field.displayName || this.field.name,
    };
  },
};
</script>
