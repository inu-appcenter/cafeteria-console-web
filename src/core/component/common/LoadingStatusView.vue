<template>
  <div>
    <!-- 샥샥 뷰 -->
    <v-flex d-flex>
      <v-layout wrap>
        <v-flex v-for="n in [1, 2, 3, 4]" :key="n" lg4 md6 sm6 xs12>
          <v-skeleton-loader v-show="loading" :elevation="2" :type="skeletonType" class="mx-2" />
        </v-flex>
      </v-layout>
    </v-flex>

    <!-- 에러 뷰 -->
    <v-card v-show="error" class="ma-2" outlined raised>
      <v-card-title> 문제가 발생하였습니다. </v-card-title>

      <v-card-text class="body-1 text--primary">
        데이터를 불러오는 도중 문제가 발생하였습니다. 문제가 지속되면
        <a href="tel:01029222661">관리자에게 연락</a> 바랍니다.
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
    error: Error,
    loading: Boolean,
    skeletonType: String,
  },
};
</script>
