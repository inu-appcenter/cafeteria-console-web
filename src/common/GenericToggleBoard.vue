<template>
  <div>
    <!-- Title -->
    <div class="mx-2 my-1">
      <h2>{{ itemDisplayName }}</h2>
    </div>

    <!-- Loading status -->
    <LoadingStatusView :loading="fetching" :error="error" skeleton-type="list-item-three-line"/>

    <!-- Item layout -->
    <v-flex d-flex>
      <v-layout wrap>
        <v-flex xs12 sm6 md6 lg4 v-for="item in allItems" :key="item[keyName]">

          <v-card class="ma-2" raised outlined :loading="item.loading">
            <v-list three-line>
              <v-list-item>

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

        </v-flex>
      </v-layout>
    </v-flex>

  </div>
</template>

<script>
import Field from '@/common/Field';
import LoadingStatusView from '@/components/LoadingStatusView';

export default {
  name: 'GenericToggleBoard',
  components: {LoadingStatusView},
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
      fetching: false,
      error: null
    };
  },

  created() {
    this.load();
  },

  methods: {
    async load() {
      this.fetching = true;

      try {
        this.allItems = await this.onFetch();
      } catch (e) {
        this.error = e;
      } finally {
        this.fetching = false;
      }
    },

    async onModifyItem(item) {
      item.modified = true;
      item.loading = true;

      await this.showResult(this.onUpdate(item));

      item.modified = false;
      item.loading = false;
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
