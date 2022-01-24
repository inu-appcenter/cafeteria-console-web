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
  <div>
    <!-- The shimmer -->
    <v-flex d-flex>
      <v-layout wrap>
        <v-flex v-for="n in [1, 2, 3, 4]" :key="n" lg4 md6 sm6 xs12>
          <v-skeleton-loader v-show="loading" :elevation="2" :type="skeletonType" class="ma-2" />
        </v-flex>
      </v-layout>
    </v-flex>

    <!-- The error view -->
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
