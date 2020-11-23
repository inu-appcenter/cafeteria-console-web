<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card class="mx-2" outlined raised>

        <v-card-title>
          <h4>{{ itemDisplayName }}</h4>
          <v-spacer />
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="검색"
              single-line
              hide-details />
        </v-card-title>

        <v-data-table
            :headers="headers"
            :items="allItems"
            :items-per-page="15"
            :search="search"
            :loading="fetching"
            loading-text="로드 중... 잠시만 기다려 주세요">

          <template v-slot:item.failed_at="{ item }">
            <v-chip
                :color="failureColor(item.failed_at)"
                dark>
              {{ item.failed_at }}
            </v-chip>
          </template>

        </v-data-table>

      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'HistoryTable',
  props: {
    headers: Array,
    onFetch: Function,
    failureColor: Function,
    itemDisplayName: String
  },

  data() {
    return {
      allItems: [],
      fetching: false,
      error: null,

      search: '',
    }
  },

  created() {
    this.load();
  },

  methods: {
    async load() {
      console.log('Fetch 시작!');
      this.fetching = true;

      try {
        console.log('Fetch 성공!');
        this.allItems = await this.onFetch();
      } catch (e) {
        console.log(`Fetch 망함!!! ${e.message}`);
        this.error = e;
      } finally {
        console.log('Fetch 종료!');
        this.fetching = false;
      }
    }
  }
}
</script>

<style scoped>

</style>
