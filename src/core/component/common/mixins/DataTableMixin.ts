import Vue from 'vue';
import GenericMixin from '@/core/component/common/mixins/GenericMixin';

export default Vue.extend({
  mixins: [GenericMixin],

  data() {
    return {
      search: '',

      // data 함수에서는 상위 mixin의 data 함수에서 정의한 값을 꺼내올 수 없다 ㅠㅡㅠ
      // 왜냐하면 지금 타이밍에서는 아직 정의중이기 때문...
      headers: this.$props.entityClass
        .metadata()
        .fields.filter(f => f.visible)
        .map((f, i) => ({
          text: f.displayName || f.name,
          value: f.name,
          align: i === 0 ? 'start' : undefined,
        })),
    };
  },
});
