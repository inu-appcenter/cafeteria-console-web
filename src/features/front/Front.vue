<template>

  <v-container fill-height>
    <v-row align="center" justify="center">
      <!-- Title -->
      <p class="display-1 text--primary">안녕하세요</p>

      <!-- Services -->
      <v-list-item v-for="service in services"
                   :key="service.name"
                   :to="service.name">
        <v-list-item-content class="d-flex justify-center light-blue--text">{{ service.subtitle }}</v-list-item-content>
      </v-list-item>

      <!-- Call admin! -->
      <v-list-item href="tel:01029222661">
        <v-list-item-content class="d-flex justify-center light-blue--text">관리자 소환</v-list-item-content>
      </v-list-item>
    </v-row>

    <!-- Footer -->
    <v-row align="center" justify="center">
      <div class="metadata-div grey--text">
        <p class="ma-0">{{ packageName }} v{{ packageVersion }}</p>
        <transition name="fade">
          <p v-show="server.version" class="ma-0">{{ server.packageName }} v{{ server.version }}</p>
        </transition>

        <v-divider class="my-3"></v-divider>

        <transition name="fade">
          <p v-show="zen" class="ma-0">{{ zen }}</p>
        </transition>
      </div>
    </v-row>

  </v-container>

</template>

<script>
import config from '../../../config';

export default {
  name: 'Front',

  data() {
    const packageInfo = require('../../../package.json');

    return {
      packageName: packageInfo.name,
      packageVersion: packageInfo.version,

      server: {
        packageName: 'cafeteria-management-server',
        version: null
      },

      services: config.services,

      zen: null
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
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.metadata-div {
  text-align: center;
  height: 100px;
}
</style>
