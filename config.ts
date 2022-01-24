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
      discountRecords: (date: string, cafeteriaId: number, fileType: string) =>
        `${baseUrl()}/records/discount/${date}?cafeteriaId=${cafeteriaId}&fileType=${fileType}`,
      visitRecords: (from: string, until: string) => `${baseUrl()}/records/visit?from=${from}&until=${until}`,
    },
  },
};
