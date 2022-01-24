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
  <div v-show="!fetching && !error && allItems.length === 0" class="empty-view-div font-weight-bold text--secondary">
    {{ itemDisplayName + '이(가) 없습니다.' }}
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'EmptyView',

  props: {
    error: {
      type: Error,
      required: false,
    },
    fetching: {
      type: Boolean,
      required: true,
    },
    allItems: {
      type: Array[Object],
      required: true,
    },
    itemDisplayName: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.empty-view-div {
  text-align: center;
  padding: 50px;
}
</style>
