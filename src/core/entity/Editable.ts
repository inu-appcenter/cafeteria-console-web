/**
 * Vue 컴포넌트에서 사용할 수 있는,
 * 편집 상태를 가지는 클래스를 정의할 때에 씁니다.
 */
export default abstract class Editable {
  editing = false;
  modified = false;
  loading = false;
  valid = false;
}
