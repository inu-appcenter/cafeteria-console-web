<template>
  <div v-show="field.visible">
    <!-- 숫자 필드 -->
    <v-text-field
      v-show="field.type === 'int'"
      :value="value"
      :label="label"
      :rules="[field.validate]"
      outlined
      type="number"
      @input="update"
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

    <!-- Boolean 필드 -->
    <v-switch
      v-show="field.type === 'boolean'"
      :value="value"
      :label="label"
      :rules="[field.validate]"
      @input="update"
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
