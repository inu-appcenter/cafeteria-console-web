<template>

  <div>
    <v-skeleton-loader v-show="loading" :elevation="2" :type="skeletonType"/>

    <v-card v-show="error" class="my-3" raised outlined>

      <v-card-title>
        문제가 발생하였습니다.
      </v-card-title>

      <v-card-text class="body-1 text--primary">
        데이터를 불러오는 도중 문제가 발생하였습니다. 문제가 지속되면 <a href="tel:01029222661">관리자에게 연락</a> 바랍니다.
      </v-card-text>

      <v-card-text>
        {{ error }}
      </v-card-text>

    </v-card>
  </div>

</template>

<script>
export default {
  name: 'LoadingStatusView',

  props: {
    loading: Boolean,
    error: Error,
    skeletonType: String
  }
}
</script>

<style scoped>

.v-skeleton-loader {
  padding-top: 12px;
}

</style>
