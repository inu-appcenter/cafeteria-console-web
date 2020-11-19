# cafeteria-management-web

**Cafeteria 웹 콘솔**

> #### Cafeteria 관련 저장소 일람
>
> ##### 서비스
> - API 서버: [cafeteria-server](https://github.com/inu-appcenter/cafeteria-server)
> - Android 앱: [cafeteria-android](https://github.com/inu-appcenter/cafeteria-android)
>
> ##### 운영 관리
> - 관리용 API 서버: [cafeteria-management-server](https://github.com/inu-appcenter/cafeteria-management-server)
> - **웹 콘솔**: [cafeteria-management-web](https://github.com/inu-appcenter/cafeteria-management-web)
>
> ##### 배포 관리
> - API 서버 배포 스크립트: [cafeteria-server-deploy](https://github.com/inu-appcenter/cafeteria-server-deploy)

## 개요

Cafeteria 서비스를 운영하면서 수정이 잦았던 부분들에 대한 간편한 접근을 지원합니다.

다음 일들을 할 수 있습니다:

- 서비스 로그 열람
- 할인 비즈니스 룰 편집
- 교내 식당과 코너 정보 편집
- 식단 파싱 규칙 편집
- ~~관리자 소환~~ 

## 배포 구성

`Netlify`에 [potados99](https://github.com/potados99) GitHub 계정으로 `cafeteria-management-web`
이라는 site를 만들어 배포하고 있습니다.

로컬에서 `npm run deploy`를 실행하여 `Netlify`에 배포합니다.

배포 도메인은 https://manage.inu-cafeteria.app 입니다. HTTPS 인증서는 `Netlify`에서 관리합니다. 무료입니다.
