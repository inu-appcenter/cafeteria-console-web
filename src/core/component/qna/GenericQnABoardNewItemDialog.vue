<template>
  <v-dialog v-model="editAnswerDialogVisible" max-width="600" persistent>
    <v-card>
      <v-card-title class="headline">
        {{ editDialogTitle }}
      </v-card-title>

      <v-card-text>
        <v-form ref="answerForm" @submit.prevent="$emit('apply')">
          <FormInputField
            v-for="field in answerFields"
            v-model="answerNowEditing[field.name]"
            :key="field.name"
            :field="field"
            @input="$emit('form-update')"
          />

          <v-btn :disabled="!(answerNowEditing.valid && answerNowEditing.modified)" block color="primary" type="submit">
            완료
          </v-btn>
          <p></p>
          <v-btn block @click="$emit('cancel-edit')">취소</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import FormInputField from '@/core/component/common/FormInputField';
export default {
  name: 'GenericQnABoardNewItemDialog',
  components: {FormInputField},

  props: {
    answerNowEditing: Object,
    answerFields: Array[Object],

    editDialogTitle: String,
    editAnswerDialogVisible: Boolean,
  },

  watch: {
    editAnswerDialogVisible() {
      this.$nextTick(() => {
        this.$refs.answerForm.resetValidation();
      });
    },
  },
};
</script>

<style scoped></style>
