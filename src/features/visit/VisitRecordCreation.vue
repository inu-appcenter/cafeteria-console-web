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
      <!-- 안내 -->
      <p class="ma-6 text--secondary">QR 체크인이 어려운 경우 방문 기록을 수기로 남겨 주세요.</p>

      <!-- 방문 기록 작성 다이얼로그 -->
      <GenericListNewItemDialog
        :error="error"
        :newItem="newItem"
        :fetching="fetching"
        :domainFields="domainFields"
        :itemDisplayName="itemDisplayName"
        :newItemDialogVisible="newItemDialogVisible"
        @apply="onClickDoneAddItem"
        @start-add="onClickAddItem"
        @cancel-add="onClickCancelAddItem"
        @form-update="onFormUpdate"
      />
    </div>
  </v-row>
</template>

<script>
import GenericListMixin from '@/core/component/list/mixins/GenericListMixin';
import GenericListNewItemDialog from '@/core/component/list/GenericListNewItemDialog';

export default {
  mixins: [GenericListMixin],

  components: {GenericListNewItemDialog},

  name: 'VisitRecordCreation',

  methods: {
    load() {
      // 원래 load는 존재하는 기록을 모두 가져와야 하지만,
      // 쓸 일이 없기에 아무 것도 안 하는 것으로 오버라이드합니다.
      // 여기서 오버라이드하지 않으면, 새 기록을 추가할 때마다 fetch를 날리게 될겁니다.
    },
  },
};
</script>

<style scoped></style>
