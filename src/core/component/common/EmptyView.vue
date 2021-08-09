<template>
  <div v-show="!fetching && !error && allItems.length === 0" class="empty-view-div font-weight-bold text--secondary">
    {{ itemDisplayName + '이(가) 없습니다.' }}
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'EmptyView',

  props: {
    error: {
      type: Error,
      required: false,
    },
    fetching: {
      type: Boolean,
      required: true,
    },
    allItems: {
      type: Array[Object],
      required: true,
    },
    itemDisplayName: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.empty-view-div {
  text-align: center;
  padding: 50px;
}
</style>
