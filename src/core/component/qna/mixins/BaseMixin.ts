/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2022 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import Vue from 'vue';
import GenericMixin from '@/core/component/common/mixins/GenericMixin';
import {classToClass} from 'class-transformer';

export default Vue.extend({
  mixins: [GenericMixin],

  props: {
    // questionClass 대신 기본 entityClass 사용합니당.
    answerClass: {
      type: Function, // 사실 함수 아니고 BaseEntity의 생성자...
      required: true,
    },
    valueMapper: {
      type: Function,
      required: true,
    },
  },

  data() {
    const answerClass = this.$props.answerClass;
    const answerMeta = answerClass.metadata();

    return {
      answerMeta,

      onWriteAnswer: answer => answer.save(),
      answerGenerator: () => new answerClass(),

      answerNowEditing: new answerClass(),
      answerBeforeEdit: null,
      editAnswerDialogTitle: null,
      editAnswerDialogVisible: false,
      currentlyAnsweringQuestion: null,
    };
  },

  methods: {
    isThisANewAnswer() {
      return this.answerNowEditing[this.keyName] == null;
    },

    isThisAnExistingAnswer() {
      return !this.isThisANewAnswer();
    },

    backupAnswer() {
      // answerBeforeEdit 인스턴스는 레퍼런스가 하나밖에 없어야 합니다.
      // 그래서 deep copy로 백업합니다.
      this.answerBeforeEdit = classToClass(this.answerNowEditing);
    },

    restoreAnswer() {
      // answerNowEditing 인스턴스는 여기저기 엮인 레퍼런스가 많습니다.
      // 인스턴스 자체는 유지하면서 내용만 바꿔주어야 합니다.
      Object.assign(this.answerNowEditing, this.answerBeforeEdit);
    },
  },
});
