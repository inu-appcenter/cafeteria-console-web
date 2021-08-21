# cafeteria-console-web

**Cafeteria 웹 콘솔**

> #### Cafeteria 관련 저장소 일람
>
> ##### 서비스
> - API 서버: [cafeteria-server](https://github.com/inu-appcenter/cafeteria-server)
> - 모바일 앱: [cafeteria-mobile](https://github.com/inu-appcenter/cafeteria-mobile)
>
> ##### 운영 관리
> - 콘솔 API 서버: [cafeteria-console-server](https://github.com/inu-appcenter/cafeteria-console-server)
> - **콘솔 웹 인터페이스**: [cafeteria-console-web](https://github.com/inu-appcenter/cafeteria-console-web)
>
> ##### 배포 관리
> - API 서버 배포 스크립트: [cafeteria-server-deploy](https://github.com/inu-appcenter/cafeteria-server-deploy)

## 개요

Cafeteria 서비스를 운영하면서 수정이 잦았던 부분들에 대한 간편한 접근을 지원합니다.

다음 일들을 할 수 있습니다:

- 공지 관리
- 서비스 로그 열람
- 할인 이용 기록 열람 
- 1:1 사용자 문의 관리
- 할인 비즈니스 룰 편집
- 식당 및 코너 정보 편집
- 식단 파싱 규칙 편집
- 앱 버전 규칙 편집
- ~~관리자 소환~~ 

## 업데이트 로그

### 2021.8.21 v1.5.2
- 테스트 수정.

### 2021.8.21 v1.5.1
- Typescript로 전환.

### 2021.4.12 v1.4.3
- 비즈니스 룰 클릭하면 팝업에서 자세하게 보임

### 2021.3.16 v1.4.2
- 프론트 페이지 레이아웃 수정

### 2021.3.16 v1.4.1
- 할인 기록 다운로드 링크 추가

### 2021.1.12 v1.4.0
- 카페테리아 Comment 추가

### 2021.1.9 v1.3.3
- GenericList bigtext 표시 개선

### 2021.1.9 v1.3.2
- MealType 표기 수정

### 2021.1.8 v1.3.1
- 공지 추가 안되는 버그 해결

### 2021.1.4 v1.3.0
- 서비스 로그 열람 기능 추가

### 2021.1.3 v1.2.6
- 뷰 간격 조절

### 2021.1.3 v1.2.5
- Masonry 레이아웃 적용

### 2020.12.30 v1.2.4
- 카페테리아 POS 번호 열람 및 편집 기능 추가

### 2020.12.20 v1.2.3
- 프로젝트 이름 변경

### 2020.12.3 v1.2.2
- 긴 텍스트 표시되지 않는 문제 해결

### 2020.12.2 v1.2.1
- 답변 로딩 끝나고 결과 렌더

### 2020.12.1 v1.2.0
- 고객센터 API 지원

### 2020.11.24 v1.1.0
- TransactionHistory 열람 기능 추가

## 배포

### 구성

`Netlify`에 [potados99](https://github.com/potados99) GitHub 계정으로 `cafeteria-console-web`
이라는 site를 만들어 배포하고 있습니다.

배포 도메인은 https://console.inu-cafeteria.app 입니다. HTTPS 인증서는 `Netlify`에서 관리합니다. 무료입니다.

### 배포하기

> `netlify` 커맨드라인 유틸리티가 설정되어 있어야 합니다.

로컬에서 `NODE_ENV`를 `production`으로 설정한 뒤 `npm run deploy`를 실행하여 `Netlify`에 배포합니다. 
