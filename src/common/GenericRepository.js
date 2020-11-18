import config from '../../config';
import EventBus from '@/event-bus';

class GenericRepository {

    constructor() {
        this.endpoint = config.api.endpoints.graphql;
    }

    async query(taskName, queryName, type) {
        const query = `
            query ${taskName}{
                ${queryName} {
                    ${type.fields().map((field) => field.name).join('\n')}
                }
            }            
        `;

        console.log(`자자 쿼리 날립니다! 이름은 ${taskName}, 리소스는 ${queryName}!`);

        const response = await this._doRequest(query);
        if (!response) {
            return [];
        }

        const rawResult = response[queryName];

        console.log(`결과 도착~!~! ${queryName}의 결과가 ${rawResult.length}개 왔네요!`);

        return rawResult.map((raw) => new type(raw));
    }

    async mutate(taskName, queryName, variables) {
        const query = `
            mutation ${taskName}(${variables.map((v) => `$${v.name}: ${v.type}`).join(', ')}) {
                ${queryName}(${variables.map((v) => `${v.name}: $${v.name}`).join(', ')})
            }
        `;

        console.log(`자자 뮤테이션 쿼리 날립니다! 이름은 ${taskName}, 리소스는 ${queryName}, 인자는 ${variables.length}개!`);

        const queryVariables = {};
        for (const v of variables) {
            queryVariables[v.name] = v.value;
        }

        const response = await this._doRequest(query, queryVariables);
        if (!response) {
            return false;
        }

        const rawResult = response[queryName];

        console.log(`결과 도착~!~! 변경된 row의 수가 ${rawResult}개라네요!`);

        const succeeded = this._decodeMutationResult(rawResult);
        console.log(succeeded ? '뮤테이션 성공~!' : '뮤테이션 실패!!');

        return succeeded;
    }

    async _doRequest(query, variables) {

        await new Promise((resolve) => {
            setTimeout(() => {resolve()}, 1000);
        });

        const response = await this._getResponse(query, variables);

        if (!response.ok) {
            if (response.status === 401) {
                this._onFailRequest();
            }

            throw new Error(`알 수 없는 에러가 발생하였습니다. 상태 코드: ${response.status}`);
        }

        const json = await response.json();
        return json.data;
    }

    async _getResponse(query, variables) {
        try {
            return await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    query,
                    variables
                })
            });

        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    _onFailRequest() {
        console.log('야 얘 로그인 시키구 와! 토스트도 띄우고!');
        EventBus.$emit('take-user-to-login-screen');
        EventBus.$emit('tell-user-that-you-need-to-sign-in');
    }

    _decodeMutationResult(result) {
        return (result === 1); // 1 means success
    }
}

export default GenericRepository;
