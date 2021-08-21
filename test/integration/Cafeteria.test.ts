import Cafeteria from '@/features/cafeteria/Cafeteria';
import {plainToClass} from 'class-transformer';
import fetch from 'node-fetch';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = fetch;

describe('카페테리아 엔티티 통째로 서버에서 들고오자!', () => {
  it('될까!?', async () => {
    console.log(Cafeteria.metadata());
  });

  it('클래스 트랜스포머 작동시켜보기', async () => {
    const fromApi = JSON.parse(`[
    {
        "id": 5,
        "name": "2호관식당",
        "corners": [
          {
            "id": 17,
            "name": "중식",
            "availableAt": 2,
            "cafeteria": null
          },
          {
            "id": 18,
            "name": "석식",
            "availableAt": 1,
            "cafeteria": null
          }
        ]
      }
    ]`);

    const parsed = plainToClass(Cafeteria, fromApi, {excludeExtraneousValues: true});

    console.log(parsed[0].corners);
  });

  it('요청 실제로 날려보기', async () => {
    console.log(await Cafeteria.find());
  });
});
