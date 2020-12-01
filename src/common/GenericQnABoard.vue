<template>

  <!-- Layout wrapper -->
  <v-row justify="center">
    <v-col cols="12" lg="12" md="8" sm="10" xs="12">

      <!-- The content -->
      <div>

        <!-- Title and new button -->
        <div class="row mx-2 my-1">
          <!-- Title -->
          <h2>{{ itemDisplayName }}</h2>

          <v-spacer/>

          <!-- New item dialog -->
          <v-dialog v-model="newItemDialogVisible" persistent max-width="600">

            <template v-slot:activator="{ on, attrs }">

              <!-- Add button -->
              <v-btn v-show="!error && !fetching" rounded v-bind="attrs" v-on="on" @click="onClickAddItem();">
                추가
                <v-icon>mdi-plus</v-icon>
              </v-btn>

            </template>

            <!-- Dialog content -->
            <v-card>

              <!-- Title -->
              <v-card-title class="headline">
                {{ itemDisplayName }} 추가
              </v-card-title>

              <!-- Contents -->
              <v-card-text>

                <v-form ref="newItemForm" @submit.prevent="onClickDoneAddItem();">
                  <!-- Text field -->
                  <v-text-field v-model="newItem[answerTitleFieldName]"
                                outlined
                                label="제목"
                                :rules="[validateRule]"/>

                  <v-textarea v-model="newItem[answerBodyFieldName]"
                                outlined
                                label="내용"
                                :rules="[validateRule]"/>

                  <v-btn type="submit" :disabled="!newItem.valid" block color="primary">완료</v-btn>
                  <p></p>
                  <v-btn block @click="onClickCancelAddItem();">취소</v-btn>

                </v-form>

              </v-card-text>

            </v-card>

          </v-dialog>
        </div>

        <!-- Loading status -->
        <LoadingStatusView :loading="fetching" :error="error"
                           skeleton-type="list-item-two-line, list-item-three-line, list-item-two-line, actions"/>

        <!-- Empty view -->
        <div class="empty-view-div font-weight-bold text--secondary" v-show="!fetching && !error && allItems.length === 0">{{ emptyText }}</div>

        <!-- Item layout -->
        <v-flex d-flex>
          <v-layout wrap>
            <v-flex xs12 sm6 md6 lg4 v-for="item in allItems" :key="item[questionKeyName]">

              <!-- Item cards -->
              <v-card class="ma-2" :raised="item.editing" :shaped="item.editing" outlined :loading="item.loading">

                <div class="row mx-0">
                  <v-card-title v-show="item[answerFieldName]" class="body-1 light-blue--text">답변됨</v-card-title>
                  <v-card-title v-show="!item[answerFieldName]" class="body-1 orange--text">답변 대기중</v-card-title>

                  <v-spacer />

                  <v-card-title v-show="item[answerFieldName]" class="text--secondary body-2">{{ (item[answerFieldName] ? item[answerFieldName].date : '') | format_date }}</v-card-title>
                </div>


                <v-divider></v-divider>

                <!-- All item list -->
                <v-list>

                  <!-- Author -->
                  <v-list-item class="small-list-item">
                    <v-list-item-content>
                      <v-list-item-subtitle>작성자</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>{{ item[questionAuthorFieldName] }}</v-list-item-action>
                  </v-list-item>

                  <!-- Date -->
                  <v-list-item class="small-list-item">
                    <v-list-item-content>
                      <v-list-item-subtitle>문의 시각</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>{{ item[questionDateFieldName] | format_date }}</v-list-item-action>
                  </v-list-item>

                  <!-- Other fields -->
                  <v-list-item class="small-list-item" v-for="field in otherQuestionFields" :key="field.name" v-show="field.visible">
                    <v-list-item-content>
                      <v-list-item-subtitle>{{ field.displayName }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>{{ item[field.name] }}</v-list-item-action>
                  </v-list-item>

                  <v-divider class="mt-2"></v-divider>

                  <!-- Content -->
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>문의 내용</v-list-item-subtitle>
                      <pre class="mt-3 body-1">{{ item[questionContentFieldName] }}</pre>
                    </v-list-item-content>
                  </v-list-item>

                </v-list>

                <!-- Action -->
                <v-card-actions>
                  <v-btn v-if="item.editing" outlined text color="red" @click="onClickDeleteItem(item)">삭제</v-btn>

                  <v-spacer/>

                  <v-btn v-show="!item.editing" :disabled="item.loading" outlined text color="orange accent-4"
                         @click="onClickModifyItem(item)">
                    수정
                  </v-btn>

                  <v-btn v-show="item.editing" outlined text color="orange accent-4"
                         @click="onClickCancelModifyItem(item)">
                    취소
                  </v-btn>
                  <v-btn v-show="item.editing" outlined :disabled="!(item.valid && item.modified)" text color="blue"
                         @click="onClickApplyItem(item)">
                    완료
                  </v-btn>

                </v-card-actions>

              </v-card>

            </v-flex>
          </v-layout>
        </v-flex>



      </div>

    </v-col>
  </v-row>

</template>

<script>
import LoadingStatusView from '@/components/LoadingStatusView';
import validation from '@/common/validation';

export default {
  name: 'GenericQnABoard',
  components: {LoadingStatusView},

  props: {
    questionKeyName: String,
    emptyText: String,
    itemDisplayName: String,
    answerGenerator: Function,

    questionAuthorFieldName: String,
    questionContentFieldName: String,
    questionDateFieldName: String,
    otherQuestionFields: Array,

    answerFieldName: String,
    answerTitleFieldName: String,
    answerBodyFieldName: String,

    onFetch: Function,
    onAnswer: Function,
    onUpdateAnswer: Function,
    onDeleteAnswer: Function
  },

  data() {
    return {
      allItems: [],
      fetching: false,
      error: null,

      // Edit cache
      itemBeforeEdit: {},
      validateRule: validation.stringNotEmpty,

      // New item form and data
      newItem: this.$props.answerGenerator(),
      newItemDialogVisible: false,
    };
  },

  created() {
    this.load();
  },

  methods: {

    async load() {
      console.log('Fetch 시작!');
      this.fetching = true;

      try {
        console.log('Fetch 성공!');
        this.allItems = await this.onFetch();
      } catch (e) {
        console.log(`Fetch 망함!!! ${e.message}`);
        this.error = e;
      } finally {
        console.log('Fetch 종료!');
        this.fetching = false;
      }
    },


    onClickAddItem() {
      this.newItem = this.answerGenerator();
    },

    async onClickDoneAddItem() {
      this.newItemDialogVisible = false;

      this.allItems.push(this.newItem);

      this.newItem.loading = true;
      await this.showResult(this.onAdd(this.newItem), '추가되었습니다');
      this.newItem.loading = false;
    },

    onClickCancelAddItem() {
      this.newItem = this.answerGenerator();
      this.newItemDialogVisible = false;
    },

    async showResult(resultPromise) {

      try {
        const result = await resultPromise;

        if (result) {
          this.$toasted.show('변경되었습니다', {
            duration: 2000,
            icon: 'done'
          });
        } else {
          this.$toasted.show('요청을 처리하지 못 하였습니다', {
            duration: 2000,
            icon: 'warning',
            action: {
              name: ''
            }
          });
        }
      } catch (e) {

        this.$toasted.show('심각한 문제가 발생하였습니다.', {
          duration: null,
          icon: 'error',
          action: [
            {
              text: '자세히',
              onClick: () => {
                alert(e);
              }
            },
            {
              text: '닫기',
              onClick : (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          ]
        });

      }
    }

  }


}
</script>

<style scoped>
.small-list-item {
  min-height: 30px;
  height: 30px;
}
</style>
