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
          <div v-for="field in domainFields" v-show="field.visible" :key="field.name">
            <!-- 숫자 필드 -->
            <v-text-field
              v-show="field.type === 'int'"
              v-model.number="newItem[field.name]"
              :label="field.name"
              :rules="[field.validate]"
              outlined
              type="number"
              @input="$emit('form-update')"
            />

            <!-- 스트링 필드 -->
            <v-text-field
              v-show="field.type === 'string'"
              v-model="newItem[field.name]"
              :label="field.name"
              :rules="[field.validate]"
              outlined
              @input="$emit('form-update')"
            />

            <!-- 텍스트 필드 -->
            <v-textarea
              v-show="field.type === 'text'"
              v-model="newItem[field.name]"
              :label="field.name"
              :rules="[field.validate]"
              outlined
              @input="$emit('form-update')"
            />

            <!-- Boolean 필드 -->
            <v-switch
              v-show="field.type === 'boolean'"
              v-model="newItem[field.name]"
              :label="field.name"
              :rules="[field.validate]"
              @change="$emit('form-update')"
            />
          </div>

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

export default Vue.extend({
  name: 'GenericListNewItemDialog',

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
