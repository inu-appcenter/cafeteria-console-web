<template>
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
          :items-per-page="100"
          :loading="fetching"
          :search="search"
          dense="dense"
          loading-text="로드 중... 잠시만 기다려 주세요"
        >
          <template v-slot:item="{item}">
            <tr>
              <td>{{ item.timestamp }}</td>
              <td class="truncate">{{ item.message }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'LogTable',

  props: {
    headers: Array,
    onFetch: Function,
    itemDisplayName: String,
  },

  data() {
    return {
      allItems: [],
      fetching: false,
      error: null,

      search: '',
    };
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
    },
  },
};
</script>

<style scoped>
.truncate {
  max-width: 64vw;
  overflow: auto;
}
</style>
