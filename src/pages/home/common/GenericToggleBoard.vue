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

    initialItems: Array,
    onUpdate: Function,
  },

  data() {
    return {
      loading: false,

      allItems: this.$props.initialItems,
    };
  },

  methods: {
    async onModifyItem(item) {
      item.modified = true;
      item.loading = true;
      this.setGlobalLoadingStatus();

      await this.onUpdate(this.allItems);

      item.modified = false;
      item.loading = false;
      this.setGlobalLoadingStatus();
    },

    setGlobalLoadingStatus() {
      this.loading = (this.allItems.filter((i) => i.loading).length > 0); // At least one loading
    }
  }
}
</script>

<style scoped>

</style>
