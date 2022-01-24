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
  <v-card>
    <v-card-title v-if="title && level === 3" class="font-weight-bold mb-4 red text-h5">{{ title }}</v-card-title>
    <v-card-title v-else-if="title && level === 2" class="font-weight-bold mb-4 orange text-h5 black--text">{{
      title
    }}</v-card-title>
    <v-card-title v-else-if="title" class="font-weight-bold mb-4 text-h5">{{ title }}</v-card-title>

    <v-card-text class="body-text">
      {{ text }}
    </v-card-text>

    <div class="actions-container">
      <v-btn
        v-show="positiveButtonText"
        block
        color="primary"
        height="90"
        class="action-button"
        @click="() => this.return(true)"
      >
        {{ positiveButtonText }}</v-btn
      >
      <v-btn
        v-show="negativeButtonText"
        block
        color="red"
        height="50"
        class="action-button"
        @click="() => this.return(false)"
      >
        {{ negativeButtonText }}</v-btn
      >
      <v-btn
        v-show="neutralButtonText"
        block
        color="grey"
        height="50"
        class="action-button"
        @click="() => this.return(undefined)"
      >
        {{ neutralButtonText }}</v-btn
      >
    </div>
  </v-card>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'BigDialog',

  props: {
    level: {
      type: Number,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: true,
    },
    positiveButtonText: {
      type: String,
      required: false,
    },
    negativeButtonText: {
      type: String,
      required: false,
    },
    neutralButtonText: {
      type: String,
      required: false,
    },
  },

  methods: {
    return(value) {
      /**
       * 이 다이얼로그를 닫고 호출자에게 결과를 반환하는 마법의 주문!
       */
      this.$root.$emit('submit', value);
      this.$emit('submit', value);
    },
  },
});
</script>

<style scoped>
.actions-container {
  padding: 0 16px 16px;
}
.action-button {
  font-size: 20px;
  font-weight: bold;
  margin-top: 12px;
}
.body-text {
  font-weight: bold;
  font-size: 20px;
  color: white;
}
</style>
