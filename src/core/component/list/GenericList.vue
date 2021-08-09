<template>
  <!-- 레이아웃 래퍼 -->
  <v-row justify="center">
    <v-col cols="12" lg="12" md="8" sm="10" xs="12">
      <!-- 컨텐츠 -->
      <div>
        <!-- 제목과 new 버튼, 다이얼로그 -->
        <div class="row mx-2 my-1">
          <!-- Title -->
          <h2>{{ itemDisplayName }}</h2>

          <v-spacer />

          <!-- New item dialog -->
          <v-dialog v-model="newItemDialogVisible" max-width="600" persistent>
            <template v-slot:activator="{on, attrs}">
              <!-- Add button -->
              <v-btn v-show="!error && !fetching" v-bind="attrs" v-on="on" rounded @click="onClickAddItem()">
                추가
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>

            <!-- Dialog content -->
            <v-card>
              <!-- Title -->
              <v-card-title class="headline"> {{ itemDisplayName }} 추가</v-card-title>

              <!-- Contents -->
              <v-card-text>
                <v-form ref="newItemForm" @submit.prevent="onClickDoneAddItem()">
                  <!-- Fields -->
                  <div v-for="field in domainFields" v-show="field.visible" :key="field.name">
                    <!-- Number field -->
                    <v-text-field
                      v-show="field.type === 'int'"
                      v-model.number="newItem[field.name]"
                      :label="field.name"
                      :rules="[field.validate]"
                      outlined
                      type="number"
                      @input="onFormUpdate()"
                    />

                    <!-- Text field -->
                    <v-text-field
                      v-show="field.type === 'string'"
                      v-model="newItem[field.name]"
                      :label="field.name"
                      :rules="[field.validate]"
                      outlined
                      @input="onFormUpdate()"
                    />

                    <!-- Text field -->
                    <v-textarea
                      v-show="field.type === 'text'"
                      v-model="newItem[field.name]"
                      :label="field.name"
                      :rules="[field.validate]"
                      outlined
                      @input="onFormUpdate()"
                    />

                    <!-- Bool field -->
                    <v-switch
                      v-show="field.type === 'boolean'"
                      v-model="newItem[field.name]"
                      :label="field.name"
                      :rules="[field.validate]"
                      @input="onFormUpdate()"
                    />
                  </div>

                  <v-btn :disabled="!newItem.valid" block color="primary" type="submit">완료</v-btn>
                  <p></p>
                  <v-btn block @click="onClickCancelAddItem()">취소</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>

        <!-- 로딩 상태 뷰 -->
        <LoadingStatusView
          :error="error"
          :loading="fetching"
          skeleton-type="list-item-two-line, list-item-three-line, list-item-two-line, actions"
        />

        <!-- 비어있음 뷰 -->
        <div
          v-show="!fetching && !error && allItems.length === 0"
          class="empty-view-div font-weight-bold text--secondary"
        >
          {{ itemDisplayName + '이(가) 없습니다.' }}
        </div>

        <!-- Masonry 홀더 -->
        <v-layout class="pl-6 pr-6 pt-0 pb-0" row>
          <v-row v-masonry item-selector=".item" transition-duration="0.3s">
            <v-col
              v-for="item in allItems"
              :key="item[keyName]"
              v-masonry-tile
              class="item pa-2"
              cols="12"
              lg="4"
              md="6"
              sm="6"
              xs="12"
            >
              <!-- 진짜 아이템들 -->
              <v-card :loading="item.loading" :raised="item.editing" :shaped="item.editing" outlined>
                <!-- 속성들 -->
                <v-list>
                  <!-- 속성 리스트 아이템 -->
                  <v-list-item v-for="field in domainFields" v-show="field.visible" :key="field.name">
                    <!-- 필드 이름 -->
                    <v-list-item-content class="pa-0 pre-line">
                      <!-- text에만 달리는 위쪽 구분선 -->
                      <v-divider v-show="field.type === 'text'" class="mt-2 mb-3"></v-divider>

                      <v-list-item-title>{{ field.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ field.description || field.name }}</v-list-item-subtitle>

                      <!-- 여기는 필드 이름이 있을 곳이지만, text의 경우는 여기에다가 필드까지 놓습니다. -->

                      <!-- 텍스트 블럭 -->
                      <div v-show="field.type === 'text'" class="pt-2">
                        <v-textarea
                          v-show="item.editing && field.mutable"
                          v-model="item[field.name]"
                          :rules="[field.validate]"
                          class="no-vertical-space"
                          hide-details
                          @input="onModifyItem(item)"
                        />

                        <div v-show="!(item.editing && field.mutable)" class="subtitle-1 pb-2">
                          {{ item[field.name] }}
                        </div>
                      </div>

                      <!-- text에만 달리는 아래쪽 구분선 -->
                      <v-divider v-show="field.type === 'text'" class="mb-1"></v-divider>
                    </v-list-item-content>

                    <!-- 값 -->
                    <v-list-item-action v-show="field.type !== 'text'">
                      <!-- 숫자 필드 -->
                      <div v-show="field.type === 'int'">
                        <v-text-field
                          v-show="item.editing && field.mutable"
                          v-model.number="item[field.name]"
                          :rules="[field.validate]"
                          class="small-text-field"
                          hide-detail
                          type="number"
                          @input="onModifyItem(item)"
                        />
                        <span v-show="!(item.editing && field.mutable)" class="subtitle-1">{{ item[field.name] }}</span>
                      </div>

                      <!-- 스트링 필드 -->
                      <div v-show="field.type === 'string'">
                        <v-text-field
                          v-show="item.editing && field.mutable"
                          v-model="item[field.name]"
                          :rules="[field.validate]"
                          class="small-text-field"
                          hide-details
                          @input="onModifyItem(item)"
                        />
                        <span v-show="!(item.editing && field.mutable)" class="subtitle-1">{{
                          item[field.name] | str_limit(20)
                        }}</span>
                      </div>

                      <!-- Bool 필드 -->
                      <div v-show="field.type === 'boolean'">
                        <v-switch
                          v-model="item[field.name]"
                          :disabled="!(item.editing && field.mutable)"
                          outlined
                          @change="onModifyItem(item)"
                        />
                      </div>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>

                <!-- 동작들 -->
                <v-card-actions>
                  <v-btn v-if="item.editing" color="red" outlined text @click="onClickDeleteItem(item)">삭제</v-btn>

                  <v-spacer />

                  <v-btn
                    v-show="!item.editing"
                    :disabled="item.loading"
                    color="orange accent-4"
                    outlined
                    text
                    @click="onClickModifyItem(item)"
                  >
                    수정
                  </v-btn>

                  <v-btn
                    v-show="item.editing"
                    color="orange accent-4"
                    outlined
                    text
                    @click="onClickCancelModifyItem(item)"
                  >
                    취소
                  </v-btn>
                  <v-btn
                    v-show="item.editing"
                    :disabled="!(item.valid && item.modified)"
                    color="blue"
                    outlined
                    text
                    @click="onClickApplyItem(item)"
                  >
                    완료
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-layout>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue';
import LoadingStatusView from '@/components/LoadingStatusView';
import GenericListMixin from '@/core/component/list/mixins/GenericListMixin';

export default Vue.extend({
  mixins: [GenericListMixin],

  name: 'GenericList',
  components: {LoadingStatusView},

  mounted() {
    this.load();
  },
});
</script>

<style>
.small-text-field {
  max-height: 30px;
}

.empty-view-div {
  text-align: center;
  padding: 50px;
}

.no-vertical-space {
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.pre-line {
  white-space: pre-line;
}
</style>
