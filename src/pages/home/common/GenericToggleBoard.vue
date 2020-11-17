<template>
  <div>
    <!-- Title -->
    <h2>{{ itemDisplayName }}</h2>

    <!-- All item list -->
    <v-card class="my-3" raised outlined :loading="loading">

      <v-list three-line>
        <v-list-item
            v-for="item in allItems"
            :key="item[keyName]">

          <v-list-item-content>
            <v-list-item-title>{{ item[nameFieldName] }}</v-list-item-title>
            <v-list-item-subtitle>{{ item[descriptionFieldName] }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-switch v-model="item[toggleFieldName]" @change="onModifyItem(item);" />
          </v-list-item-action>

        </v-list-item>
      </v-list>
    </v-card>

  </div>

</template>

<script>
import Field from '@/pages/home/common/Field';

export default {
  name: 'GenericToggleBoard',

  props: {
    keyName: String,
    nameFieldName: String,
    toggleFieldName: String,
    descriptionFieldName: String,

    itemName: String,
    itemDisplayName: String,
    domainFields: Array[Field],

    onFetch: Function,
    onUpdate: Function
  },

  data() {
    return {
      allItems: [],

      loading: false,
    };
  },

  created() {
    this.load();
  },

  methods: {
    load() {
      this.onFetch().then((items) => {
        this.allItems = items;
      });
    },

    async onModifyItem(item) {
      item.modified = true;
      item.loading = true;
      this.updateGlobalLoadingStatus();

      await this.showResult(this.onUpdate(item));

      item.modified = false;
      item.loading = false;
      this.updateGlobalLoadingStatus();
    },

    updateGlobalLoadingStatus() {
      this.loading = (this.allItems.filter((i) => i.loading).length > 0); // At least one loading
    },

    async showResult(resultPromise) {

      try {
        const result = await resultPromise;

        if (result) {
          this.$toasted.show('변경되었습니다', {
            duration: 2000,
            icon: 'done'
          });
        } else {
          this.$toasted.show('요청을 처리하지 못 하였습니다', {
            duration: 2000,
            icon: 'warning',
            action: {
              name: ''
            }
          });
        }
      } catch (e) {

        this.$toasted.show('심각한 문제가 발생하였습니다.', {
          duration: null,
          icon: 'error',
          action: [
            {
              text: '자세히',
              onClick: () => {
                alert(e);
              }
            },
            {
              text: '닫기',
              onClick : (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          ]
        });

      }
    }
  }
}
</script>

<style scoped>

</style>
