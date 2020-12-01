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
                  <!-- Fields -->
                  <div v-for="field in domainFields" :key="field.name" v-show="field.visible">

                    <!-- Number field -->
                    <v-text-field v-show="field.type === 'number'" type="number" v-model.number="newItem[field.name]"
                                  outlined
                                  :label="itemName + '.' + field.name" @input="onFormUpdate();"
                                  :rules="[field.validate]"/>

                    <!-- Text field -->
                    <v-text-field v-show="field.type === 'text'" v-model="newItem[field.name]" outlined
                                  :label="itemName + '.' + field.name" @input="onFormUpdate();"
                                  :rules="[field.validate]"/>

                    <!-- Text field -->
                    <v-textarea v-show="field.type === 'bigtext'" v-model="newItem[field.name]" outlined
                                :label="itemName + '.' + field.name" @input="onFormUpdate();"
                                :rules="[field.validate]"/>

                    <!-- Bool field -->
                    <v-switch v-show="field.type === 'bool'" v-model="newItem[field.name]"
                              :label="itemName + '.' + field.name" @input="onFormUpdate();" :rules="[field.validate]"/>
                  </div>

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
        <div class="empty-view-div font-weight-bold text--secondary" v-show="!fetching && !error">{{ emptyText }}</div>

        <!-- Item layout -->
        <v-flex d-flex>
          <v-layout wrap>
            <v-flex xs12 sm6 md6 lg4 v-for="item in allItems" :key="item[keyName]">

              <!-- Item cards -->
              <v-card class="ma-2" :raised="item.editing" :shaped="item.editing" outlined :loading="item.loading">

                <!-- All item list -->
                <v-list>

                  <!-- Contents -->
                  <v-list-item v-for="field in domainFields" :key="field.name" v-show="field.visible">
                    <!-- Field name -->
                    <v-list-item-content>
                      <v-list-item-title>{{ field.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ itemName }}.{{ field.name }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <!-- Values -->
                    <v-list-item-action>
                      <!-- Number field -->
                      <div v-show="field.type === 'number'">
                        <v-text-field v-show="item.editing && field.mutable" type="number"
                                      v-model.number="item[field.name]"
                                      @input="onModifyItem(item);" :rules="[field.validate]" hide-detail
                                      class="small-text-field"/>
                        <span v-show="!(item.editing && field.mutable)" class="subtitle-1">{{ item[field.name] }}</span>
                      </div>

                      <!-- Text field -->
                      <div v-show="field.type === 'text'">
                        <v-text-field v-show="item.editing && field.mutable" v-model="item[field.name]"
                                      @input="onModifyItem(item);" :rules="[field.validate]" hide-details
                                      class="small-text-field"/>
                        <span v-show="!(item.editing && field.mutable)"
                              class="subtitle-1">{{ item[field.name] | str_limit(20) }}</span>
                      </div>

                      <!-- Text area -->
                      <div v-show="field.type === 'bigtext'">
                        <v-textarea v-show="item.editing && field.mutable" v-model="item[field.name]"
                                    @input="onModifyItem(item);" :rules="[field.validate]" hide-details/>
                        <span v-show="!(item.editing && field.mutable)"
                              class="subtitle-1">{{ item[field.name] | str_limit(20) }}</span>
                      </div>

                      <!-- Bool field -->
                      <div v-show="field.type === 'bool'">
                        <v-switch :disabled="!(item.editing && field.mutable)" v-model="item[field.name]" outlined
                                  @change="onModifyItem(item);"/>
                      </div>

                    </v-list-item-action>
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
import Field from '@/common/Field';
import LoadingStatusView from '@/components/LoadingStatusView';

export default {
  name: 'GenericList',
  components: {LoadingStatusView},
  props: {
    keyName: String,
    itemName: String,
    emptyText: String,
    itemDisplayName: String,
    domainFields: Array[Field],

    itemGenerator: Function,
    formValidator: Function,

    onFetch: Function,
    onAdd: Function,
    onUpdate: Function,
    onDelete: Function,
  },

  data() {
    return {
      allItems: [],
      fetching: false,
      error: null,

      // Edit cache
      itemBeforeEdit: {},

      // New item form and data
      newItem: this.$props.itemGenerator(),
      newItemDialogVisible: false,
    }
  },

  created() {
    this.load();
  },

  watch: {
    newItemDialogVisible() {
      this.$nextTick(() => {
        this.$refs.newItemForm.resetValidation();
      });
    }
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

    onClickModifyItem(item) {
      this._backupItem(item);

      item.editing = true;
    },

    _backupItem(item) {
      this.itemBeforeEdit[item[this.$props.keyName]] = Object.assign({}, item);
    },

    onClickCancelModifyItem(item) {
      this._restoreItem(item);

      item.modified = false;
      item.editing = false;
    },

    _restoreItem(item) {
      Object.assign(item, this.itemBeforeEdit[item[this.$props.keyName]]);
    },

    async onClickApplyItem(item) {
      item.editing = false;

      item.loading = true;
      await this.showResult(this.onUpdate(item), '변경되었습니다');
      item.loading = false;
    },

    async onClickDeleteItem(item) {
      const go = await this.$confirm(`정말로 선택하신 ${this.itemDisplayName}을(를) 삭제하시겠습니까?
      (${this.domainFields.map((f) => `${f.name}: ${item[f.name]}`).join(', ')})`,
          {buttonTrueText: '삭제', buttonFalseText: '취소'});

      if (!go) {
        return;
      }

      item.loading = true;
      await this.showResult(this.onDelete(item), '삭제되었습니다');
      item.loading = false;

      this.allItems.splice(this.allItems.indexOf(item), 1); // Deleting
    },

    onModifyItem(item) {
      item.valid = this._isItemValid(item);
      console.log(item);
      console.log('valid?', item.valid);
      item.modified = true;
    },

    onClickAddItem() {
      this.newItem = this.itemGenerator();
      console.log(this.newItem);
    },

    onFormUpdate() {
      this.newItem.valid = this._isNewItemValid(this.newItem);
    },

    _isItemValid(item) {
      for (const field of this.$props.domainFields) {
        // Result should be pure 'true'.
        if (field.validate(item[field.name]) !== true) {
          return false;
        }
      }

      return true;
    },

    _isNewItemValid(item) {
      const itemValid = this._isItemValid(item);
      const itemValidAsANewItem = this.$props.formValidator(item, this.allItems);

      return itemValid && itemValidAsANewItem;
    },

    async onClickDoneAddItem() {
      this.newItemDialogVisible = false;

      this.allItems.push(this.newItem);

      this.newItem.loading = true;
      await this.showResult(this.onAdd(this.newItem), '추가되었습니다');
      this.newItem.loading = false;
    },

    onClickCancelAddItem() {
      this.newItem = this.itemGenerator();
      this.newItemDialogVisible = false;
    },

    async showResult(resultPromise, onSuccessMessage) {

      try {
        const result = await resultPromise;

        if (result) {
          this.$toasted.show(onSuccessMessage, {
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
              onClick: (e, toastObject) => {
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
.small-text-field {
  max-height: 30px;
}

.empty-view-div {
  text-align: center;
  padding: 50px;
}
</style>
