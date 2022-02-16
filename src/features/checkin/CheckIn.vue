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
  <div ref="wrapper" class="qrcode-scanner-wrapper">
    <!-- 스캐너 표면 -->
    <qrcode-stream :class="{'inverse-horizontal': inverted}" :camera="camera" @decode="onDecode" @init="onInit" />

    <!-- 그 위를 덮고 있는 나머지들 -->
    <div class="qrcode-overlay-surface">
      <!-- 네모 프레임 -->
      <div @click="() => reloadCamera(true)" class="scanner-frame-container">
        <!-- 네모 -->
        <div class="scanner-frame"></div>
      </div>

      <!-- 카메라 전환 버튼 -->
      <button v-show="!(noRearCamera || noFrontCamera)" class="bottom-left-button" @click="() => switchCamera(true)">
        ⟳
      </button>

      <!-- 카메라 좌우반전 버튼 -->
      <button class="bottom-right-button" @click="() => invertCamera(true)">⇔</button>

      <!-- 로딩 오버레이 -->
      <div v-show="checkInLoading" class="informative-overlay-content dark-blur-backdrop">
        <v-progress-circular indeterminate />
        서버와 통신중입니다.
      </div>

      <!-- 성공 메시지 오버레이 -->
      <div v-show="checkInSuccess" class="informative-overlay-content dark-blur-backdrop">✅ 체크인 성공</div>
    </div>

    <!-- 화면 상단에 위치한 반투명 오버레이 -->
    <div @click="openSettings" class="overlay dark-blur-backdrop">
      <div class="overlay-section-container">
        <div class="overlay-section">
          <div class="section-label">예약</div>
          <div class="section-value">{{ context.expected == null ? '-' : context.expected }}명</div>
        </div>
        <div class="overlay-section">
          <div class="section-label">입장</div>
          <div class="section-value">{{ context.actual == null ? '-' : context.actual }}명</div>
        </div>
        <div class="overlay-section">
          <div class="section-label">총원</div>
          <div class="section-value">{{ context.total == null ? '-' : context.total }}명</div>
        </div>
      </div>
    </div>

    <!-- 오버레이를 누르면 나오는, 설정 팝업 -->
    <v-dialog v-model="settingsDialog">
      <v-card>
        <v-toolbar dark color="dark">
          <v-btn icon dark>
            <v-icon>mdi-cog</v-icon>
          </v-btn>
          <v-toolbar-title>QR 스캐너 설정</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="closeSettings">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list>
          <v-list-item>
            <v-list-item-action>위치</v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <v-select
                  v-model="selectedCafeteria"
                  :items="allCafeteria"
                  item-text="displayName"
                  :hint="`${selectedCafeteria ? selectedCafeteria.displayName : '-'}에서 입장을 운영합니다.`"
                  return-object
                ></v-select>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" block @click="closeSettings">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CheckInMixin from '@/features/checkin/mixins/CheckInMixin';
// noinspection ES6CheckImport
import {QrcodeStream} from 'vue-qrcode-reader';

export default {
  mixins: [CheckInMixin],
  name: 'CheckIn',

  components: {QrcodeStream},
};
</script>

<style scoped>
.informative-overlay-content {
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;

  font-size: 24px;
}

.dark-blur-backdrop {
  color: white;
  background: #00000099;
  backdrop-filter: blur(5px);
}

.overlay {
  position: absolute;
  top: 0;
  width: 100%;
}

.overlay-top {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 8px 0;
  font-size: 12px;
}

.overlay-section-container {
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 6px 6px 6px;
}

.overlay-section {
  font-size: 18px;
  text-align: center;
}

.section-label {
  font-size: 14px;
}

.section-value {
  font-weight: bold;
}

.qrcode-scanner-wrapper {
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.qrcode-overlay-surface {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;

  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.bottom-left-button {
  position: absolute;
  font-size: 36px;
  padding: 4px;
  left: 12px;
  bottom: 12px;
}

.bottom-right-button {
  position: absolute;
  font-size: 36px;
  padding: 4px;
  right: 12px;
  bottom: 12px;
}

.scanner-frame-container {
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.scanner-frame {
  width: 40%;
  padding-bottom: 40%;

  border: 3px dashed #ffc341;
  outline: 10000px solid #00000040;
  background: transparent;
}

.inverse-horizontal {
  -moz-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>
