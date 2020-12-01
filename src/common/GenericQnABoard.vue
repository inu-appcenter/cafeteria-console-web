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

                <!-- Question status -->
                <div class="row mx-0">
                  <v-card-title v-show="item[answerFieldName] && !item[answerFieldName].read" class="body-1 light-blue--text">답변됨</v-card-title>
                  <v-card-title v-show="item[answerFieldName] && item[answerFieldName].read" class="body-1 green--text">답변 전달됨</v-card-title>
                  <v-card-title v-show="!item[answerFieldName]" class="body-1 orange--text">답변 대기중</v-card-title>

                  <v-spacer />

                  <v-card-title v-show="item[answerFieldName]" class="text--secondary body-2">{{ (item[answerFieldName] ? item[answerFieldName].date : '') | format_date }}</v-card-title>
                  <v-card-title v-show="!item[answerFieldName]" class="text--secondary body-2">{{ item.date | format_time_diff }} 경과</v-card-title>
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
                    <v-list-item-content class="pb-0">
                      <v-list-item-subtitle>문의 내용</v-list-item-subtitle>
                      <pre class="mt-3 body-1">{{ item[questionContentFieldName] }}</pre>
                    </v-list-item-content>
                  </v-list-item>

                </v-list>

                <!-- Action -->
                <v-card-actions>

                  <v-spacer/>

                  <v-btn v-show="!item[answerFieldName]" block color="orange accent-4"
                         @click="onClickAnswer(item)">
                    답변하기
                  </v-btn>

                  <v-btn v-show="item[answerFieldName]"  outlined text color="light-blue accent-4"
                         @click="onClickUpdateAnswer(item)">
                    답변 수정하기
                  </v-btn>

                </v-card-actions>

              </v-card>

            </v-flex>
          </v-layout>
        </v-flex>


        <!-- New item dialog -->
        <v-dialog v-model="editAnswerDialogVisible" persistent max-width="600">
          <!-- Dialog content -->
          <v-card>

            <!-- Title -->
            <v-card-title class="headline">
              {{ editDialogTitle }}
            </v-card-title>

            <!-- Contents -->
            <v-card-text>

              <v-form ref="answerForm" @submit.prevent="onClickDoneEditAnswer(answerNowEditing);">
                <!-- Text field -->
                <v-text-field v-model="answerNowEditing[answerTitleFieldName]"
                              outlined
                              label="제목"
                              @input="onModifyAnswer(answerNowEditing)"
                              :rules="[validateRule]"/>

                <v-textarea v-model="answerNowEditing[answerBodyFieldName]"
                            outlined
                            label="내용"
                            @input="onModifyAnswer(answerNowEditing)"
                            :rules="[validateRule]"/>

                <v-btn type="submit" :disabled="!(answerNowEditing.valid && answerNowEditing.modified)" block color="primary">완료</v-btn>
                <p></p>
                <v-btn block @click="onClickCancelEditAnswer(answerNowEditing);">취소</v-btn>

              </v-form>

            </v-card-text>

          </v-card>

        </v-dialog>

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
    answerKeyName: String,
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

  watch: {
    editAnswerDialogVisible() {
      this.$nextTick(() => {
        this.$refs.answerForm.resetValidation();
      });
    }
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
      answerNowEditing: this.$props.answerGenerator(),
      currentlyAnsweringQuestion: null,
      editAnswerDialogVisible: false,
      editDialogTitle: '답변하기',
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

    async showResult(resultPromise) {

      try {
        const result = await resultPromise;

        if (result) {
          this.$toasted.show('반영되었습니다', {
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
    },

    onClickAnswer(question) {
      this.currentlyAnsweringQuestion = question;

      this.editDialogTitle = '답변하기';
      this.answerNowEditing = this.answerGenerator();

      this.editAnswerDialogVisible = true;
    },

    onClickUpdateAnswer(question) {
      this.currentlyAnsweringQuestion = question;
      const answerToUpdate = this.currentlyAnsweringQuestion.answer;

      this._backupAnswer(answerToUpdate);

      this.editDialogTitle = '답변 수정하기';
      this.answerNowEditing = answerToUpdate;

      this.editAnswerDialogVisible = true;
    },

    onClickDoneEditAnswer(answer) {
      this.editAnswerDialogVisible = false;
      answer.modified = false;

      if (this.isThisANewAnswer(answer)) {
        this._addNewAnswer(answer);
      } else {
        this._applyModifiedAnswer(answer);
      }
    },

    async _addNewAnswer(answer) {
      this.currentlyAnsweringQuestion.answer = answer;

      this.currentlyAnsweringQuestion.loading = true;
      await this.showResult(this.onAnswer(this.currentlyAnsweringQuestion[this.questionKeyName], answer), '추가되었습니다');
      this.currentlyAnsweringQuestion.loading = false;

      // refresh page or not.
    },

    async _applyModifiedAnswer(answer) {
      this.currentlyAnsweringQuestion.loading = true;
      await this.showResult(this.onUpdateAnswer(this.currentlyAnsweringQuestion[this.questionKeyName], answer), '추가되었습니다');
      this.currentlyAnsweringQuestion.loading = false;
    },

    onClickCancelEditAnswer(answer) {
      this.editAnswerDialogVisible = false;

      if (this.isThisANewAnswer(answer)) {
        // do nothing.
      } else {
        this._restoreAnswer(answer);
      }
    },

    onModifyAnswer(answer) {
      answer.valid = this.validateRule(answer[this.answerTitleFieldName]) === true &&
          this.validateRule(answer[this.answerBodyFieldName]) === true;

      answer.modified = true;
    },

    isThisANewAnswer(answer) {
      const thisAnswerHasId = !!answer[this.answerKeyName];
      if (!thisAnswerHasId) {
        // No id means it has not reached the server's db.
        return true;
      }

      const allAnswerIds = this.allItems.map((q) => q[this.answerFieldName]).filter((a) => !!a).map((a) => a[this.answerKeyName]);

      // Answer has id(don't know how) but not included in the collection from the server.
      return allAnswerIds.indexOf(answer[this.answerKeyName]) < 0;
    },

    _backupAnswer(answer) {
      this.itemBeforeEdit[answer[this.answerKeyName]] = Object.assign({}, answer);
    },

    _restoreAnswer(answer) {
      Object.assign(answer, this.itemBeforeEdit[answer[this.answerKeyName]]);
    },
  }

}
</script>

<style scoped>
.small-list-item {
  min-height: 30px;
  height: 30px;
}
</style>
