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
  async fetchContext(cafeteriaId: number): Promise<Context> {
    const result = await http.get(config.api.endpoints.checkInContext(cafeteriaId));

    const {capacity, expected, actual, total, timeSlotStart, timeSlotEnd} = await result.json();

    return Context.of({
      capacity,
      expected,
      actual,
      total,
      timeSlotStart: timeSlotStart ? new Date(timeSlotStart) : undefined,
      timeSlotEnd: timeSlotEnd ? new Date(timeSlotEnd) : undefined,
    });
  }

  async checkIn(ticket: string, gracefulInTime: boolean) {
    await http.post(config.api.endpoints.checkIn, {ticket, gracefulInTime});
  }
}

export default new CheckInRepository();
