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
