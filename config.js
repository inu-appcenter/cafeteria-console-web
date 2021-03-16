import {isProduction} from '@/utils/nodeEnv';

const serverUrl = {
    dev: 'http://10.0.1.10:8081',
    production: 'https://console-api.inu-cafeteria.app',
};

function baseUrl() {
    return isProduction() ? serverUrl.production : serverUrl.dev;
}

export default {

    pageTitle: '카페테리아 콘솔',

    services: [
        {
            name: 'Notices',
            icon: 'mdi-bullhorn',
            subtitle: '공지사항'
        },
        {
            name: 'Logs',
            icon: 'mdi-text',
            subtitle: '서비스 로그'
        },
        {
            name: 'Histories',
            icon: 'mdi-history',
            subtitle: '할인 이용 기록'
        },
        {
            name: 'Questions',
            icon: 'mdi-message-reply',
            subtitle: '1:1 사용자 문의'
        },
        {
            name: 'Rules',
            icon: 'mdi-barcode',
            subtitle: '할인 비즈니스 룰',
        },
        {
            name: 'Cafeteria',
            icon: 'mdi-food',
            subtitle: '식당 및 코너 정보'
        },
        {
            name: 'Parsing',
            icon: 'mdi-pencil',
            subtitle: '식단 파싱 규칙'
        },
        {
            name: 'Versions',
            icon: 'mdi-apps',
            subtitle: '앱 버전 규칙'
        },
        /*
        {
            name: 'DB',
            icon: 'mdi-database',
            subtitle: '서비스 DB 백업 및 복원'
        }*/
    ],

    api: {
        endpoints: {
            graphql: `${baseUrl()}/graphql`,
            signIn: `${baseUrl()}/sign-in`,
            dailyLogs: (date, cafeteriaId, fileType) => `${baseUrl()}/logs/${date}?cafeteriaId=${cafeteriaId}&fileType=${fileType}`,
            version: `${baseUrl()}/version`,
            zen: 'https://api.github.com/zen'
        }
    }

};
