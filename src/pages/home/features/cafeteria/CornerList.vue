<template>
  <div>
    <div class="display-1 text--primary">코너</div>
    <v-card v-for="corner in allCorners" :key="corner.id"
            class="my-3" raised outlined :loading="corner.loading">

      <!-- Contents -->
      <v-card-text>

        <!-- Corner id -->
        <div>
          corner.id
          <p class="display-1 text--primary">{{ corner.id }}</p>
        </div>

        <!-- Corner name -->
        <div>
          corner.name
          <v-text-field v-if="corner.editing" v-model="corner.name" outlined @keydown="onModifyCorner(corner);" />
          <p v-else class="display-1 text--primary">{{ corner.name }}</p>
        </div>

        <!-- Corner display name -->
        <div>
          corner.display_name
          <v-text-field v-if="corner.editing" v-model="corner.display_name" outlined @keydown="onModifyCorner(corner);" />
          <p v-else class="display-1 text--primary">{{ corner.display_name }}</p>
        </div>

        <!-- Corner cafeteria id -->
        <div>
          corner.cafeteria_id
          <v-text-field v-if="corner.editing" v-model="corner.cafeteria_id" outlined @keydown="onModifyCorner(corner);" />
          <p v-else class="display-1 text--primary">{{ corner.cafeteria_id }}</p>
        </div>

      </v-card-text>

      <!-- Action -->
      <v-card-actions>
        <v-btn v-if="!corner.editing" outlined text color="orange accent-4" @click="onClickModifyCorner(corner)">수정</v-btn>
        <v-btn v-if="corner.editing" outlined text color="orange accent-4" @click="onClickCancelModifyCorner(corner)">취소</v-btn>
        <v-btn v-if="corner.editing" outlined :disabled="!corner.modified" text color="blue" @click="onClickApplyCorner(corner)">완료</v-btn>

        <v-spacer></v-spacer>

        <v-btn v-if="corner.editing" outlined text color="red" @click="onClickDeleteCorner(corner)">삭제</v-btn>
      </v-card-actions>

    </v-card>
  </div>
</template>

<script>
import ObjectHelper from '@/pages/home/features/cafeteria/ObjectHelper';

const cornerDummy =  [
  {
    id: 1,
    name: '그냥 교내 식당1',
    display_name: '식당1',
    cafeteria_id: 1
  }
];

function cornersWithStates(allCorners) {
  const props = ['loading', 'editing', 'modified'];

  return allCorners.map((corner) => {
    return ObjectHelper.withBoolProps(corner, props);
  });
}

export default {
  name: 'CornerList',

  data: () => ({
    allCorners: cornersWithStates(cornerDummy),

    // Edit cache
    cornersBeforeEdit: {}
  }),

  methods: {
    onClickModifyCorner(corner) {
      this._backupCorner(corner);

      corner.editing = true;
    },

    _backupCorner(corner) {
      this.cornersBeforeEdit[corner.id] = Object.assign({}, corner);
    },

    onClickCancelModifyCorner(corner) {
      this._restoreCorners(corner);

      corner.modified = false;
      corner.editing = false;
    },

    _restoreCorners(corner) {
      Object.assign(corner, this.cornersBeforeEdit[corner.id]);
    },

    onClickApplyCorner(corner) {
      corner.editing = false;
    },

    onClickDeleteCorner(corner) {
      corner;
    },

    onModifyCorner(corner) {
      corner.modified = true;
    }
  }
}

</script>

<style scoped>

</style>
