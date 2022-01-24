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
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12">
        <v-card class="mx-2" outlined raised>
          <v-card-title>
            <h4>{{ itemDisplayName }}</h4>
            <v-spacer />
            <v-text-field v-model="search" append-icon="mdi-magnify" hide-details label="검색" single-line />
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="allItems"
            :items-per-page="15"
            :loading="fetching"
            :search="search"
            loading-text="로드 중... 잠시만 기다려 주세요"
          >
            <template v-slot:item.timestamp="{item}">
              {{ item.timestamp | format_date }}
            </template>
            <template v-slot:item.failedAt="{item}">
              <v-chip :color="failureColor(item.failedAt)" dark>
                {{ item.failedAt }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import DataTableMixin from '@/core/component/common/mixins/DataTableMixin';

export default Vue.extend({
  mixins: [DataTableMixin],

  name: 'HistoryDataTable',
  props: {
    failureColor: Function,
  },

  mounted() {
    this.load();
  },
});
</script>
