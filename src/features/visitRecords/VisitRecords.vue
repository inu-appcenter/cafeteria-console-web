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
  <v-container fluid>
    <v-card>
      <v-card-title class="font-weight-bold">교내 식당 방문 기록 액셀 다운로드</v-card-title>

      <v-row class="ma-2">
        <v-col cols="12" sm="6">
          <v-date-picker color="blue" v-model="dates" range full-width />
        </v-col>

        <v-col cols="12" sm="6">
          <v-card-text>1. 날짜 선택 창에서 기간의 시작과 끝을 선택해주세요.</v-card-text>
          <v-card-text>2. 아래 "엑셀 다운로드" 버튼을 눌러주세요.</v-card-text>
          <v-card-subtitle>• 선택하신 범위가 넓을 경우 다운로드에 시간이 소요될 수 있습니다.</v-card-subtitle>
          <v-card-subtitle>• 개인정보 수집이용 및 제공에 동의한 상태인 사용자의 기록만 포함됩니다.</v-card-subtitle>
          <v-btn
            class="no-transform-button pa-6"
            color="blue"
            :href="excelDownloadUrl"
            rounded
            width="100%"
            :disabled="dates.filter(d => d).length < 2"
          >
            {{ selectedDates }} 엑셀 다운로드
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import {subDays, format} from 'date-fns';
import config from '../../../config';

export default {
  name: 'VisitRecords',

  data() {
    const now = new Date();
    const fewAgo = subDays(now, 14);

    return {
      dates: [format(fewAgo, 'yyyy-MM-dd'), format(now, 'yyyy-MM-dd')],
    };
  },

  computed: {
    excelDownloadUrl() {
      return `${config.api.endpoints.visitRecords(
        this.dates[0]?.replace(/-/gi, ''),
        this.dates[1]?.replace(/-/gi, ''),
      )}`;
    },
    selectedDates() {
      return this.dates.join(' ~ ');
    },
  },
};
</script>

<style scoped>
.no-transform-button {
  text-transform: none;
}
</style>
