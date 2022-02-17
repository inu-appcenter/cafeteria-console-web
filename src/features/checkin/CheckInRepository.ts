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

  /**
   * 특정 식당에 대해 체크인 Context를 관찰합니다.
   *
   * @param cafeteriaId 관찰할 식당의 식별자.
   * @param onContext 새 context 도착시 실행할 콜백.
   */
  listenForContext(cafeteriaId: number, onContext: (context: Context) => void) {
    this.previousEventSource?.close();

    const eventSource = new EventSource(config.api.endpoints.checkInContext(cafeteriaId), {withCredentials: true});

    eventSource.addEventListener('context', event => {
      const context = Context.fromResponse(JSON.parse(event['data']));

      onContext(context);
    });

    this.previousEventSource = eventSource;
  }

  /**
   * 체크인 요청을 날립니다.
   *
   * @param ticket 예약 티켓.
   * @param cafeteriaId 요청을 보내는 현재 위치한 식당의 식별자.
   * @param gracefulInTime "시간 봐줘" 모드.
   */
  async checkIn(ticket: string, cafeteriaId: number, gracefulInTime: boolean) {
    await http.post(config.api.endpoints.checkIn, {ticket, cafeteriaId, gracefulInTime});
  }
}

export default new CheckInRepository();
