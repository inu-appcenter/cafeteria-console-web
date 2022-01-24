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

export default function stringifyError(error: Error) {
  if (error.name === 'NotAllowedError') {
    return 'ERROR: you need to grant camera access permission';
  } else if (error.name === 'NotFoundError') {
    return 'ERROR: no camera on this device';
  } else if (error.name === 'NotSupportedError') {
    return 'ERROR: secure context required (HTTPS, localhost)';
  } else if (error.name === 'NotReadableError') {
    return 'ERROR: is the camera already in use?';
  } else if (error.name === 'OverconstrainedError') {
    return 'ERROR: installed cameras are not suitable';
  } else if (error.name === 'StreamApiNotSupportedError') {
    return 'ERROR: Stream API is not supported in this browser';
  } else if (error.name === 'InsecureContextError') {
    return 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
  } else {
    return `ERROR: Camera error (${error.name})`;
  }
}
