<template>

  <!-- Layout wrapper -->
  <v-row justify="center">
    <v-col cols="12" lg="12" md="8" sm="10" xs="12">

      hah

    </v-col>
  </v-row>

</template>

<script>
export default {
  name: 'GenericQnABoard',
  props: {
    questionKeyName: String,
    emptyText: String,
    itemDisplayName: String,
    answerGenerator: Function,

    questionAuthorFieldName: String,
    questionContentFieldName: String,
    questionDateFieldName: String,

    answerFieldName: String,
    answerTitleFieldName: String,
    answerBodyFieldName: String,

    onFetch: Function,
    onAnswer: Function,
    onUpdateAnswer: Function,
    onDeleteAnswer: Function
  },

  date() {
    return {
      allItems: [],
      fetching: false,
      error: null,

      // Edit cache
      itemBeforeEdit: {},

      // New item form and data
      newItem: this.$props.answerGenerator(),
      newItemDialogVisible: false,
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
    }



  }


}
</script>

<style scoped>

</style>
