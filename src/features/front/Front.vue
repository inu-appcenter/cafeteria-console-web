<template>
  <v-container fill-height>
    <!-- Greetings -->
    <v-row align="center" class="mt-8" justify="center">
      <!-- Title -->
      <p class="display-1 text--primary">안녕하세요 :)</p>
    </v-row>

    <!-- Primary features -->
    <v-row align="center" class="mt-4" justify="center">
      <!-- Logs download(txt)-->
      <v-list-item :href="dailyLogsUrlTxt">
        <v-list-item-content class="d-flex justify-center light-blue--text font-weight-bold"
          >{{ todayString }} 학식당 할인 기록 보기(텍스트)
        </v-list-item-content>
      </v-list-item>

      <!-- Logs download(xls)-->
      <v-list-item :href="dailyLogsUrlXls">
        <v-list-item-content class="d-flex justify-center light-blue--text font-weight-bold"
          >{{ todayString }} 학식당 할인 기록 보기(엑셀)
        </v-list-item-content>
      </v-list-item>

      <!-- Call admin! -->
      <v-list-item href="tel:01029222661">
        <v-list-item-content class="d-flex justify-center light-blue--text">관리자 소환(휴대전화)</v-list-item-content>
      </v-list-item>

      <!-- KakaoTalk admin! -->
      <v-list-item href="https://open.kakao.com/o/s6UdqU2c">
        <v-list-item-content class="d-flex justify-center light-blue--text">관리자 소환(카카오톡)</v-list-item-content>
      </v-list-item>
    </v-row>

    <!-- Services -->
    <v-row align="center" class="mt-4" justify="center">
      <v-list-item v-for="service in services" :key="service.name" :to="service.name">
        <v-list-item-content class="d-flex justify-center light-blue--text">{{ service.subtitle }}</v-list-item-content>
      </v-list-item>
    </v-row>

    <!-- Footer -->
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

      todayString: formatDateYYYYMMDD(new Date()),
      dailyLogsUrlTxt: config.api.endpoints.dailyLogs(formatDateYYYYMMDD(new Date()), 4 /* 학생식당 */, 'txt'),
      dailyLogsUrlXls: config.api.endpoints.dailyLogs(formatDateYYYYMMDD(new Date()), 4 /* 학생식당 */, 'xls'),
      services: config.services,

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
      const response = await fetch(config.api.endpoints.version);
      this.server.version = await response.text();
    },

    async _fetchZen() {
      const response = await fetch(config.api.endpoints.zen);
      const text = await response.text();
      this.zen = text.length > 50 ? `Something went wrong...` : text;
    },
  },
};
</script>

<style>
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
