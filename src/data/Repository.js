import config from '../../config';
import request from 'graphql-request';

class Repository {

    constructor() {
        this.endpoint = config.server.endpoint;
    }

    async _doRequest(query, variables) {
        return await request(this.endpoint, query, variables)
    }

    _decodeMutationResult(result) {
        return (result === 1); // 1 means success
    }
}

export default Repository;
