<template>
  <div>
    <!-- 숫자 필드 -->
    <v-text-field
      v-show="field.type === 'int'"
      v-model.number="value"
      :label="field.name"
      :rules="[field.validate]"
      outlined
      type="number"
      @input="update"
    />

    <!-- 스트링 필드 -->
    <v-text-field
      v-show="field.type === 'string'"
      v-model="value"
      :label="field.name"
      :rules="[field.validate]"
      outlined
      @input="update"
    />

    <!-- 텍스트 필드 -->
    <v-textarea
      v-show="field.type === 'text'"
      v-model="value"
      :label="field.name"
      :rules="[field.validate]"
      outlined
      @input="update"
    />

    <!-- Boolean 필드 -->
    <v-switch
      v-show="field.type === 'boolean'"
      v-model="value"
      :label="field.name"
      :rules="[field.validate]"
      @input="update"
    />
  </div>
</template>

<script>
export default {
  name: 'FormField',
  props: ['field', 'value'],

  methods: {
    update(newValue) {
      this.$emit('input', newValue);
    },
  },
};
</script>
