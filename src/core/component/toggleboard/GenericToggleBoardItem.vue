<template>
  <v-dialog v-model="dialogVisible" max-width="600px">
    <!-- 보드 내용 -->
    <template v-slot:activator="{on, attrs}">
      <!-- 아이템 카드 -->
      <v-card :loading="item.loading" outlined raised>
        <v-list three-line>
          <v-list-item>
            <v-list-item-content v-bind="attrs" v-on="on">
              <v-list-item-title>{{ item[nameFieldName] }}</v-list-item-title>
              <v-list-item-subtitle>{{ item[descriptionFieldName] }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-switch v-model="item[toggleFieldName]" @change="$emit('modify', item)" />
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </template>

    <!-- 클릭하면 보이는 상세보기 내용 -->
    <v-card raised>
      <v-list three-line>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title style="white-space: normal">{{ item[nameFieldName] }}</v-list-item-title>
            <v-list-item-subtitle>{{ item[descriptionFieldName] }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'GenericToggleBoardItem',

  props: {
    item: Object,
    nameFieldName: String,
    toggleFieldName: String,
    descriptionFieldName: String,
  },

  data() {
    return {
      dialogVisible: false,
    };
  },
});
</script>
