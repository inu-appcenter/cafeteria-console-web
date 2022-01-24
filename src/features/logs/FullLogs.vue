<!--
  - This file is part of INU Cafeteria.
  -
  - Copyright 2022 INU Global App Center <potados99@gmail.com>
  -
  - INU Cafeteria is free software: you can redistribute it and/or modify
  - it under the terms of the GNU General Public License as published by
  - the Free Software Foundation, either version 3 of the License, or
  - (at your option) any later version.
  -
  - INU Cafeteria is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU General Public License for more details.
  -
  - You should have received a copy of the GNU General Public License
  - along with this program.  If not, see <https://www.gnu.org/licenses/>.
  -->

<template>
  <v-row align="center" justify="center">
    <div class="metadata-div">
      <!-- Description -->
      <p class="ma-6 text--secondary">
        전체 서비스 로그는 AWS CloudWatch에서 제공합니다. AWS 관리자 계정이 필요합니다.
      </p>

      <!-- Go! button -->
      <v-btn
        class="no-transform-button pa-6"
        color="blue"
        href="https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#logsV2:log-groups/log-group/cafeteria-server"
        rounded
      >
        AWS CloudWatch로 이동
      </v-btn>
    </div>
  </v-row>
</template>

<script>
export default {
  name: 'FullLogs',
};
</script>

<style scoped>
.no-transform-button {
  text-transform: none;
}
</style>
