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
          <FormField
            v-for="field in domainFields"
            v-show="field.visible"
            :key="field.name"
            :field="field"
            v-model="newItem[field.name]"
          >
          </FormField>

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
import FormField from '@/core/component/common/FormField';

export default Vue.extend({
  name: 'GenericListNewItemDialog',
  components: {FormField},
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
