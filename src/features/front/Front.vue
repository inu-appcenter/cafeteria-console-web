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
  <v-container fill-height>
    <!-- 인사 -->
    <v-row align="center" class="mt-8" justify="center">
      <!-- 타이틀 -->
      <p class="display-1 text--primary">안녕하세요 :)</p>
    </v-row>

    <!-- 주 기능 -->
    <v-row align="center" class="mt-4" justify="center">
      <!-- 할인 기록 다운로드(txt)-->
      <v-list-item :href="discountRecordsUrlTxt">
        <v-list-item-content class="d-flex justify-center light-blue--text font-weight-bold"
          >{{ todayString }} 학식당 할인 기록 보기(텍스트)
        </v-list-item-content>
      </v-list-item>

      <!-- 할인 기록 다운로드(xls)-->
      <v-list-item :href="discountRecordsUrlXls">
        <v-list-item-content class="d-flex justify-center light-blue--text font-weight-bold"
          >{{ todayString }} 학식당 할인 기록 보기(엑셀)
        </v-list-item-content>
      </v-list-item>

      <!-- 관리자 호출(전화)! -->
      <v-list-item href="tel:01029222661">
        <v-list-item-content class="d-flex justify-center light-blue--text">관리자 소환(휴대전화)</v-list-item-content>
      </v-list-item>

      <!-- 관리자 호출(카카오톡)! -->
      <v-list-item href="https://open.kakao.com/o/s6UdqU2c">
        <v-list-item-content class="d-flex justify-center light-blue--text">관리자 소환(카카오톡)</v-list-item-content>
      </v-list-item>
    </v-row>

    <!-- 서비스 목록 -->
    <v-row
      v-for="serviceGroup in services"
      :key="serviceGroup.displayName"
      align="center"
      justify="center"
      class="mt-4"
    >
      <v-list-item
        v-for="serviceItem in serviceGroup.items"
        :key="serviceItem.name"
        :to="`/${serviceGroup.name}/${serviceItem.name}`"
      >
        <v-list-item-content class="d-flex justify-center light-blue--text">{{
          serviceItem.displayName
        }}</v-list-item-content>
      </v-list-item>
    </v-row>

    <!-- 하단 -->
    <v-row align="center" class="mt-12" justify="center">
      <div class="metadata-div grey--text">
        <p class="ma-0">{{ packageName }} v{{ packageVersion }}</p>
        <transition name="fade">
          <p v-show="server.version" class="ma-0">{{ server.packageName }} v{{ server.version }}</p>
        </transition>

        <transition name="fade">
          <v-divider v-show="zen" class="my-3"></v-divider>
        </transition>

        <transition name="fade">
          <p v-show="zen" class="ma-0">{{ zen }}</p>
        </transition>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import config from '../../../config';
import packageInfo from '../../../package.json';
import {formatDateYYYYMMDD} from '@/utils/date';
import http from '@/core/request/http';
import services from '../../../services';

export default {
  name: 'Front',

  data() {
    return {
      packageName: packageInfo.name,
      packageVersion: packageInfo.version,

      server: {
        packageName: 'cafeteria-console-server',
        version: null,
      },

      todayString: formatDateYYYYMMDD(),
      discountRecordsUrlTxt: config.api.endpoints.discountRecords(formatDateYYYYMMDD(), 1 /* 학생식당 */, 'txt'),
      discountRecordsUrlXls: config.api.endpoints.discountRecords(formatDateYYYYMMDD(), 1 /* 학생식당 */, 'xls'),
      services: services,

      zen: null,
    };
  },

  created() {
    this.load();
  },

  methods: {
    async load() {
      await this._fetchVersion();
      await this._fetchZen();
    },

    async _fetchVersion() {
      const response = await http.get(config.api.endpoints.version);
      this.server.version = await response.text();
    },

    async _fetchZen() {
      setTimeout(() => {
        this.zen = '© 2021 INU Appcenter';
      }, 700);
    },
  },
};
</script>

<style>
/* 쓸모없어 보여도 fade를 위해 다 쓰이고 있음. */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.metadata-div {
  text-align: center;
  height: 100px;
}
</style>
