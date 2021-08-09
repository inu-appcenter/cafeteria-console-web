<template>
  <div v-show="!fetching && !error && allItems.length === 0" class="empty-view-div font-weight-bold text--secondary">
    {{ itemDisplayName + '이(가) 없습니다.' }}
  </div>
</template>

<script>
export default {
  name: 'EmptyView',

  props: {
    error: Object,
    fetching: Boolean,
    allItems: Array[Object],
    itemDisplayName: String,
  },
};
</script>

<style scoped>
.empty-view-div {
  text-align: center;
  padding: 50px;
}
</style>
