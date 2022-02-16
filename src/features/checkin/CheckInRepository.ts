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

import config from '../../../config';
import Context from '@/features/checkin/Context';
import http from '@/core/request/http';

class CheckInRepository {
  private previousEventSource?: EventSource = undefined;

  listenForContext(cafeteriaId: number, onContext: (context: Context) => void) {
    this.previousEventSource?.close();

    const eventSource = new EventSource(config.api.endpoints.checkInContext(cafeteriaId), {withCredentials: true});

    eventSource.addEventListener('context', event => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onContext(Context.fromResponse(JSON.parse(event.data)));
    });

    this.previousEventSource = eventSource;
  }

  async checkIn(ticket: string, cafeteriaId: number, gracefulInTime: boolean) {
    await http.post(config.api.endpoints.checkIn, {ticket, cafeteriaId, gracefulInTime});
  }
}

export default new CheckInRepository();
