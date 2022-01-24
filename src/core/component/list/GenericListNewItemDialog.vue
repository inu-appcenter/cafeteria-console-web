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
  <v-dialog v-model="newItemDialogVisible" max-width="600" persistent>
    <template v-slot:activator="{on, attrs}">
      <v-btn v-show="!error && !fetching" v-bind="attrs" v-on="on" rounded @click="$emit('start-add')">
        추가
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline"> {{ itemDisplayName }} 추가</v-card-title>

      <v-card-text>
        <v-form ref="newItemForm" @submit.prevent="$emit('apply')">
          <FormInputField
            v-for="field in domainFields"
            v-model="newItem[field.name]"
            :key="field.name"
            :field="field"
            @input="$emit('form-update')"
          />

          <v-btn :disabled="!newItem.valid" block color="primary" type="submit">완료</v-btn>
          <p></p>
          <v-btn block @click="$emit('cancel-add')">취소</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from 'vue';
import FormInputField from '@/core/component/common/FormInputField';

export default Vue.extend({
  name: 'GenericListNewItemDialog',
  components: {FormInputField},

  props: {
    error: Error || null,
    newItem: Object,
    fetching: Boolean,
    domainFields: Array[Object],
    itemDisplayName: String,
    newItemDialogVisible: Boolean,
  },

  watch: {
    newItemDialogVisible() {
      this.$nextTick(() => {
        this.$refs.newItemForm.resetValidation();
      });
    },
  },
});
</script>

<style scoped></style>
