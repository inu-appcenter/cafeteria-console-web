<template>
  <v-row justify="center" align="center">

    <div class="metadata-div">
      <!-- Description -->
      <p class="ma-6 text--secondary">전체 서비스 로그는 AWS CloudWatch에서 제공합니다. AWS 관리자 계정이 필요합니다.</p>

      <!-- Go! button -->
      <v-btn
          class="no-transform-button pa-6"
          rounded
          color="blue"
          href="https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#logsV2:log-groups/log-group/cafeteria-server">
        AWS CloudWatch로 이동
      </v-btn>
    </div>

  </v-row>
</template>

<script>
export default {
  name: 'FullLogs'
}
</script>

<style scoped>
.no-transform-button {
  text-transform: none;
}
</style>
