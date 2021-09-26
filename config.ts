import {isProduction} from '@/utils/nodeEnv';

const serverUrl = {
  dev: 'http://localhost:8090',
  production: 'https://console-api.inu-cafeteria.app',
};

function baseUrl() {
  return isProduction() ? serverUrl.production : serverUrl.dev;
}

export default {
  pageTitle: '카페테리아 콘솔',

  api: {
    endpoints: {
      login: `${baseUrl()}/login`,
      visit: `${baseUrl()}/visit`,
      checkIn: `${baseUrl()}/checkin`,
      checkInContext: (cafeteriaId: number) => `${baseUrl()}/checkin/context?cafeteriaId=${cafeteriaId}`,
      graphql: `${baseUrl()}/graphql`,
      version: `${baseUrl()}/version`,
      zen: 'https://api.github.com/zen',
      discountRecords: (date, cafeteriaId, fileType) =>
        `${baseUrl()}/records/discount/${date}?cafeteriaId=${cafeteriaId}&fileType=${fileType}`,
    },
  },
};
