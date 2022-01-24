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
