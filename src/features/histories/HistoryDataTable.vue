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
import GenericMixin from '@/core/component/common/mixins/GenericMixin';

export default Vue.extend({
  mixins: [GenericMixin],

  name: 'HistoryDataTable',
  props: {
    failureColor: Function,
  },

  data() {
    return {
      search: '',

      // data 함수에서는 상위 mixin의 data 함수에서 정의한 값을 꺼내올 수 없다 ㅠㅡㅠ
      // 왜냐하면 지금 타이밍에서는 아직 정의중이기 때문...
      headers: this.$props.entityClass.metadata().fields.map((f, i) => ({
        text: f.description,
        value: f.name,
        align: i === 0 ? 'start' : undefined,
      })),
    };
  },

  mounted() {
    this.load();
  },
});
</script>
